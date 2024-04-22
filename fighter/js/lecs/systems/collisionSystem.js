import { COLLISION_COMPONENT, HEALTH_COMPONENT, OWNER_COMPONENT, POSITION_COMPONENT, RENDER_COMPONENT, arenaElement } from "../components/constants.js";
import { MOVEMENT_SPEED } from "../game.js";
import { getRndInteger } from "../utils/utils.js";
import { BaseSystem } from "./baseSystem.js";


const epsilon=0.05
export class CollisionSystem extends BaseSystem{
    #player1Collisions
    #player2Collisions
    #player1Position
    #player2Position
    constructor(player1Id,player2Id,componentManager,config={},logger){
        super(componentManager,logger)
        this.#player1Collisions=this.componentManager.getEntityComponentByType(player1Id,COLLISION_COMPONENT)
        this.#player2Collisions=this.componentManager.getEntityComponentByType(player2Id,COLLISION_COMPONENT)
        this.#player1Position=this.componentManager.getEntityComponentByType(player1Id,POSITION_COMPONENT)
        this.#player2Position=this.componentManager.getEntityComponentByType(player2Id,POSITION_COMPONENT)
    }

    update(){
        this._checkPlayersInbounds()
        this._checkPlayersCollision()
        this._checkProjectileCollision()
    }
    _checkPlayersInbounds(){
        this._playerInbounds(this.#player1Position,this.#player1Collisions)
        this._playerInbounds(this.#player2Position,this.#player2Collisions)
    }

    _playerInbounds(positionComponent,collisionComponent){
        let futureX=positionComponent.x+(positionComponent.velocity.x*MOVEMENT_SPEED);
        let futureY=positionComponent.y+(positionComponent.velocity.y*MOVEMENT_SPEED);
        let result=true;

        this._OOBFailsafe(positionComponent,collisionComponent);

        if (futureX<arenaElement.getBoundingClientRect().left || futureX+collisionComponent.width>arenaElement.getBoundingClientRect().right){
            positionComponent.velocity.x=0;
            result=false
        }
        if (futureY<arenaElement.getBoundingClientRect().top || futureY+collisionComponent.height>arenaElement.getBoundingClientRect().bottom){
            positionComponent.velocity.y=0;
            result=false
        }

        
        return result
        
    }

    _OOBFailsafe(positionComponent,collisionComponent){
        let arenaBounds=arenaElement.getBoundingClientRect()
        if (positionComponent.x<arenaBounds.left || positionComponent.x+collisionComponent.width>arenaBounds.right){
            positionComponent.x=getRndInteger(arenaBounds.left+10,arenaBounds.right-10)    
        }
        if (positionComponent.x+collisionComponent.width<arenaBounds.left || positionComponent.x>arenaBounds.right){
            positionComponent.x=getRndInteger(arenaBounds.left+10,arenaBounds.right-10)    
        }
        if (positionComponent.y<arenaBounds.top || positionComponent.y+collisionComponent.height>arenaBounds.bottom){
            positionComponent.y=getRndInteger(arenaBounds.top+10,arenaBounds.bottom-10)
        }
        if (positionComponent.y+positionComponent.height<arenaBounds.top || positionComponent.y>arenaBounds.bottom){
            positionComponent.y=getRndInteger(arenaBounds.top+10,arenaBounds.bottom-10)
        }
    }

    _checkPlayersCollision(){
        let player1Width=this.#player1Collisions.width
        let player2Width=this.#player2Collisions.width
        let player1Height=this.#player1Collisions.height
        let player2Height=this.#player2Collisions.height

        let overlapResult=overlaps(this.#player1Position.asVector(),this.#player2Position.asVector(),player1Width,player2Width,player1Height,player2Height)
        if (overlapResult[0] && overlapResult[1]){
            console.log("player overlap!!!111")
            //estas dos líneas son honestamente magia de chatgpt: tiene que ver con encontrar si es más distante el componente X o Y para decidir en qué eje
            //pueden moverse los jugadores al estar chocando.
            const overlapX = Math.abs((this.#player1Position.x + this.#player1Collisions.width / 2) - (this.#player2Position.x + this.#player2Collisions.width / 2));
            const overlapY = Math.abs((this.#player1Position.y + this.#player1Collisions.height / 2) - (this.#player2Position.y + this.#player2Collisions.height / 2));

            if (overlapX > overlapY) {
                // Move along Y axis
                let newPos1=this.#player1Position.asVector();
                newPos1.x+=this.#player1Position.velocity.x*MOVEMENT_SPEED;
                let newPos2=this.#player2Position.asVector();
                newPos2.x+=this.#player2Position.velocity.x*MOVEMENT_SPEED;
                let futurePosOverlap=overlaps(newPos1,newPos2,player1Width,player2Width,player1Height,player2Height);
                if (this.#player1Position.velocity.x==this.#player2Position.velocity.x){

                }
                else if (futurePosOverlap[0] && futurePosOverlap[1]){
                    this.#player1Position.velocity.x=0;
                    this.#player2Position.velocity.x=0;
                }
            } else {
                // Move along X axis
                let newPos1=this.#player1Position.asVector();
                newPos1.y+=this.#player1Position.velocity.y*MOVEMENT_SPEED;
                let newPos2=this.#player2Position.asVector();
                newPos2.y+=this.#player2Position.velocity.y*MOVEMENT_SPEED;
                // evitar que no puedan retroceder.
                let futurePosOverlap=overlaps(newPos1,newPos2,player1Width,player2Width,player1Height,player2Height);
                if (this.#player1Position.velocity.y==this.#player2Position.velocity.y){

                }
                else if (futurePosOverlap[0] && futurePosOverlap[1]){
                    this.#player1Position.velocity.y=0;
                    this.#player2Position.velocity.y=0;
                }
                
            }
        }

    }

    
    _checkProjectileCollision(){
        this.componentManager.getComponentsByType(OWNER_COMPONENT).forEach(ownerComponent => {
            if (!ownerComponent.enabled) return; //continue 
            
            let projectilePositionComponent=this.componentManager.getEntityComponentByType(ownerComponent.entityId,POSITION_COMPONENT)
            let projectileCollisionComponent=this.componentManager.getEntityComponentByType(ownerComponent.entityId,COLLISION_COMPONENT)
            if (!this._playerInbounds(projectilePositionComponent,projectileCollisionComponent)){
                ownerComponent.disable()
                projectilePositionComponent.velocity.x=0
                projectilePositionComponent.velocity.y=0
                this.componentManager.getEntityComponentByType(ownerComponent.entityId,RENDER_COMPONENT).invisible()
            }
            this._checkProjectileOverlaps(ownerComponent,projectilePositionComponent,projectileCollisionComponent)        
        });
    }

    _checkProjectileOverlaps(ownerComponent,projectilePositionComponent,projectileCollisionComponent){
        this.componentManager.getComponentsByTypes(COLLISION_COMPONENT,POSITION_COMPONENT,HEALTH_COMPONENT).forEach((components)=>{
            if (components.length<1) return; //continue
            //console.log("components",components)
            let otherCollisionComponent=components[COLLISION_COMPONENT]
            let otherPositionComponent=components[POSITION_COMPONENT]
            let otherHealthComponent=components[HEALTH_COMPONENT]

            let sameEntity=otherCollisionComponent.entityId==projectileCollisionComponent.entityId
            let otherIsOwner=otherCollisionComponent.entityId==ownerComponent.ownerId

            if (sameEntity || otherIsOwner) return //continue
            
            if (otherHealthComponent){
                let positionOverlaps=overlaps(projectilePositionComponent.asVector(),otherPositionComponent.asVector(),
                                                projectileCollisionComponent.width,otherCollisionComponent.width,
                                                    projectileCollisionComponent.height,otherCollisionComponent.height)
                if (positionOverlaps[0] && positionOverlaps[1]){
                    otherHealthComponent.hurt(ownerComponent.damage)
                    ownerComponent.disable()
                    projectilePositionComponent.velocity.x=0
                    projectilePositionComponent.velocity.y=0
                    this.componentManager.getEntityComponentByType(ownerComponent.entityId,RENDER_COMPONENT).invisible()
                }
            }
        })
    }
    

    
}

export function overlaps(pos1,pos2,w1,w2,h1,h2){
    //console.log("x1", pos1.x,"y1",pos1.y)
    //console.log("w1 ",w1, "h1 ",h1)
    //console.log("w2 ",w2, "h2 ",h2)
    let overlapX=(pos1.x>=pos2.x && pos1.x<=pos2.x+w2) || (pos2.x>=pos1.x && pos2.x<=pos1.x+w1);
    let overlapY=(pos1.y>=pos2.y && pos1.y<=pos2.y+h2) || (pos2.y>=pos1.y && pos2.y<=pos1.y+h1);
    return [overlapX,overlapY]
}