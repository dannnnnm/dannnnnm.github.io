import { CollisionComponent } from "../components/collisionComponent.js";
import { COLLISION_COMPONENT, HEALTH_COMPONENT, MELEE_COMPONENT, POSITION_COMPONENT, PROJECTILE_COMPONENT } from "../components/constants.js";
import { OwnerComponent } from "../components/ownerComponent.js";
import { PositionComponent, Vector2D } from "../components/positionComponent.js";
import { RenderComponent } from "../components/renderComponent.js";
import { MOVEMENT_SPEED } from "../game.js";
import { BaseSystem } from "./baseSystem.js";
import { overlaps } from "./collisionSystem.js";

export class AttackSystem extends BaseSystem{
    #player1Id
    #player2Id

    #player1Collisions
    #player2Collisions

    #player1Position
    #player2Position

    #player1Health
    #player2Health

    #player1Attack
    #player2Attack
    #entityManager
    constructor(player1Id,player2Id,componentManager,entitiyManager,config={},logger){
        super(componentManager,logger)
        this.#player1Collisions=this.componentManager.getEntityComponentByType(player1Id,COLLISION_COMPONENT)
        this.#player2Collisions=this.componentManager.getEntityComponentByType(player2Id,COLLISION_COMPONENT)

        this.#player1Position=this.componentManager.getEntityComponentByType(player1Id,POSITION_COMPONENT)
        this.#player2Position=this.componentManager.getEntityComponentByType(player2Id,POSITION_COMPONENT)

        this.#player1Health=this.componentManager.getEntityComponentByType(player1Id,HEALTH_COMPONENT)
        this.#player2Health=this.componentManager.getEntityComponentByType(player2Id,HEALTH_COMPONENT)

        this.#player1Attack=this.componentManager.getEntityComponentByType(player1Id,MELEE_COMPONENT)
        this.#player2Attack=this.componentManager.getEntityComponentByType(player2Id,MELEE_COMPONENT)

        this.#player1Id=player1Id
        this.#player2Id=player2Id
        this.#entityManager=entitiyManager
    }

    update(){
        this._meleeAttack()
        this._projectileAttack()
        
    }
    
    _meleeAttack(){
        let playersOverlap=this._playersOverlap()
        if(playersOverlap[0] && playersOverlap[1]){
            this._attackOther(this.#player1Attack,this.#player1Health,this.#player2Health)
            this._attackOther(this.#player2Attack,this.#player2Health,this.#player1Health)
        }
        else {
            //ataque desperdiciado
            this.#player1Attack.miss();
            this.#player2Attack.miss();

        }
    }

    _projectileAttack(){
        let player1Projectile=this.componentManager.getEntityComponentByType(this.#player1Id,PROJECTILE_COMPONENT)
        let player2Projectile=this.componentManager.getEntityComponentByType(this.#player2Id,PROJECTILE_COMPONENT)
        this._checkPlayerProjectile(player1Projectile,this.#player1Position,this.#player1Collisions)
        this._checkPlayerProjectile(player2Projectile,this.#player2Position,this.#player2Collisions)
        
    }

    _checkPlayerProjectile(playerProjectileComponent,playerPosition,playerCollision){
    
        if (playerProjectileComponent.prepared()){
            
            let projectileId=this.#entityManager.addEntity("projectile")
            let damage=playerProjectileComponent.attack()
            
            let direction=new Vector2D(playerPosition.velocity.x,playerPosition.velocity.y)
            if(direction.x==0 && direction.x==direction.y){
                direction.x=MOVEMENT_SPEED;
            }


            let projectileX=playerPosition.x+playerCollision.width/2
            let projectileY=playerPosition.y+playerCollision.height/2
            let projectilePositionComponent=new PositionComponent(projectileId,projectileX,projectileY)
            projectilePositionComponent.velocity=direction;
            this.componentManager.addComponent(projectilePositionComponent)

            let projectileRenderComponent=new RenderComponent(projectileId,["images/kinball.png"],projectilePositionComponent.asVector(),0.05)
            this.componentManager.addComponent(projectileRenderComponent)
            
            let projectileSpriteDimensions=projectileRenderComponent.htmlElement();
            let collisionComponent=new CollisionComponent(projectileId,new Vector2D(),projectileSpriteDimensions.width,projectileSpriteDimensions.height)
            this.componentManager.addComponent(collisionComponent);

            
            let projectileOwnerComponent=new OwnerComponent(projectileId,playerCollision.entityId,damage);
            this.componentManager.addComponent(projectileOwnerComponent)
        }
    }

    _attackOther(selfAttack,selfHealth,otherHealth){
        if (selfAttack.prepared() && selfHealth.alive){
            otherHealth.hurt(selfAttack.attack())
        }
        
    }

    _playersOverlap(){
        return overlaps(this.#player1Position.asVector(),this.#player2Position.asVector(),
                            this.#player1Collisions.width, this.#player2Collisions.width,
                            this.#player1Collisions.height, this.#player2Collisions.height)
    }

}