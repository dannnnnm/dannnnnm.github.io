import { HEALTH_COMPONENT, MELEE_COMPONENT, POSITION_COMPONENT, PROJECTILE_COMPONENT } from "../components/constants.js";
import { BaseSystem } from "./baseSystem.js";

export class InputSystem extends BaseSystem{
    #movementSpeed
    #pressedKeys=new Set();

    #player1Id
    #player2Id
    #player1HealthComponent
    #player2HealthComponent
    constructor(player1Id,player2Id,componentManager,config={},logger){
        super(componentManager,logger)
        this.#movementSpeed=config.movementSpeed || 1;
        this._initInput();
        this.#player1Id=player1Id
        this.#player2Id=player2Id
        this.#player1HealthComponent=this.componentManager.getEntityComponentByType(player1Id,HEALTH_COMPONENT);
        this.#player2HealthComponent=this.componentManager.getEntityComponentByType(player2Id,HEALTH_COMPONENT);
    }

    update(){
        this._updatePlayers();
        
    }

    _updatePlayers(){
        this._updatePlayer1()
        this._updatePlayer2()

    }

    _updatePlayer1(){
        if (!this.#player1HealthComponent.alive) return;
        let player1Pos=this.componentManager.getEntityComponentByType(this.#player1Id,POSITION_COMPONENT)
        let player1Melee=this.componentManager.getEntityComponentByType(this.#player1Id,MELEE_COMPONENT)
        let player1Projectile=this.componentManager.getEntityComponentByType(this.#player1Id,PROJECTILE_COMPONENT)
        if (this.#pressedKeys.has("ArrowRight")){
            player1Pos.velocity.x+=this.#movementSpeed
        }
        if (this.#pressedKeys.has("ArrowLeft")){
            player1Pos.velocity.x-=this.#movementSpeed
        }
        if (this.#pressedKeys.has("ArrowUp")){
            player1Pos.velocity.y-=this.#movementSpeed
        }
        if (this.#pressedKeys.has("ArrowDown")){
            player1Pos.velocity.y+=this.#movementSpeed
        }
        if (this.#pressedKeys.has("Space")){
            player1Melee.prepareAttack()
            this.#pressedKeys.delete("Space")
        }
        if (this.#pressedKeys.has("KeyM")){
            player1Projectile.prepareAttack()
            this.#pressedKeys.delete("KeyM")
        }
    }

    _updatePlayer2(){
        if (!this.#player2HealthComponent.alive) return;
        let player2Pos=this.componentManager.getEntityComponentByType(this.#player2Id,POSITION_COMPONENT)
        let player2Melee=this.componentManager.getEntityComponentByType(this.#player2Id,MELEE_COMPONENT)
        let player2Projectile=this.componentManager.getEntityComponentByType(this.#player2Id,PROJECTILE_COMPONENT)
        if (this.#pressedKeys.has("KeyD")){
            player2Pos.velocity.x+=this.#movementSpeed
        }
        if (this.#pressedKeys.has("KeyA")){
            player2Pos.velocity.x-=this.#movementSpeed
        }
        if (this.#pressedKeys.has("KeyW")){
            player2Pos.velocity.y-=this.#movementSpeed
        }
        if (this.#pressedKeys.has("KeyS")){
            player2Pos.velocity.y+=this.#movementSpeed
        }
        if (this.#pressedKeys.has("KeyG")){
            player2Melee.prepareAttack()
            this.#pressedKeys.delete("KeyG")
        }
        if (this.#pressedKeys.has("KeyH")){
            player2Projectile.prepareAttack()
            this.#pressedKeys.delete("KeyH")
        }
    }


    _initInput() {
        document.addEventListener("keydown", this._keyDown.bind(this));
        document.addEventListener("keyup",this._keyUp.bind(this));
    }

    _keyDown(event){
        this.#pressedKeys.add(event.code)

        console.log(event.code)
    }

    _keyUp(event){
        this.#pressedKeys.delete(event.code)
    }

}