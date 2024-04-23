import { MOVEMENT_SPEED } from "../game.js";
import { BaseComponent } from "./baseComponent.js";

export class PositionComponent extends BaseComponent{
    x;
    y;
    movementSpeed
    velocity;
    inputControlled;
    constructor(entityId,x,y,movementSpeed=MOVEMENT_SPEED,inputControlled=false) {
        super(entityId)
        this.x=x
        this.y=y
        this.inputControlled=inputControlled
        this.velocity=new Vector2D();
        this.movementSpeed=movementSpeed
        
    }

    asVector(){
        return new Vector2D(this.x,this.y)
    }

}


export class Vector2D{
    x;
    y;
    constructor(x=0,y=0){
        this.x=x
        this.y=y
    }

    normalized(){
        let length=Math.sqrt((this.x*this.x)+(this.y*this.y))
        return new Vector2D(this.x/length,this.y/length)
    }
}