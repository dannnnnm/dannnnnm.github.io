import { POSITION_COMPONENT } from "../components/constants.js";
import { BaseSystem } from "./baseSystem.js";

export class InputSystem extends BaseSystem{
    #movementSpeed
    #pressedKeys=new Set();
    constructor(componentManager,config={},logger){
        super(componentManager,logger)
        this.#movementSpeed=config.movementSpeed || 1;
        this._initInput();
    }

    update(player1Id,player2Id){
        this._updatePlayers(player1Id,player2Id);
        
    }

    _updatePlayers(player1Id,player2Id){
        this._updatePlayer1(player1Id)
        this._updatePlayer2(player2Id)

    }

    _updatePlayer1(player1Id){
        let player1Pos=this.componentManager.getEntityComponentByType(player1Id,POSITION_COMPONENT)
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
    }

    _updatePlayer2(player2Id){
        let player2Pos=this.componentManager.getEntityComponentByType(player2Id,POSITION_COMPONENT)
        
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
    }

    _updateProjectiles(){

    }

    _initInput() {
        document.addEventListener("keydown", this._keyDown.bind(this));
        document.addEventListener("keyup",this._keyUp.bind(this));
    }

    _keyDown(event){
        this.#pressedKeys.add(event.code)
    }

    _keyUp(event){
        this.#pressedKeys.delete(event.code)
    }

}