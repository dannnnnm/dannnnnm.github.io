import { POSITION_COMPONENT } from "../components/constants.js";
import { MOVEMENT_SPEED } from "../game.js";
import { BaseSystem } from "./baseSystem.js";

export class MovementSystem extends BaseSystem{
    constructor(componentManager,config={},logger){
        super(componentManager,logger)
        
    }

    update(){
        this.componentManager.getComponentsByType(POSITION_COMPONENT).forEach((positionComponent) => {
            if (positionComponent.velocity.x!=0){
                console.log("x normalized ", positionComponent.velocity.normalized().x)
                positionComponent.x+=positionComponent.velocity.normalized().x*MOVEMENT_SPEED;
                if (positionComponent.inputControlled) positionComponent.velocity.x=0;
                
            }
            if (positionComponent.velocity.y!=0){
                positionComponent.y+=positionComponent.velocity.normalized().y*MOVEMENT_SPEED;
                if (positionComponent.inputControlled) positionComponent.velocity.y=0;
            }
        });
    }
}