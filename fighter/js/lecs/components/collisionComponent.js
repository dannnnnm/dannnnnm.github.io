import { BaseComponent } from "./baseComponent.js"
import { Vector2D } from "./positionComponent.js"

export class CollisionComponent extends BaseComponent{
    x
    y
    width
    height
    constructor(entityId,positionVector,width,height){
        super(entityId)
        this.x=positionVector.x
        this.y=positionVector.y
        this.width=width
        this.height=height
    }
}