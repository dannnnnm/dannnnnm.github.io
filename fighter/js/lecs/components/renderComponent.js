import { BaseComponent } from "./baseComponent.js"
import { arenaElement } from "./constants.js"

export class RenderComponent extends BaseComponent{
    spritePath=[]
    initialPosition
    scale
    #htmlComponent

    constructor(entityId,spriteList,initialPosition,scale=1.0){
        super(entityId)
        this.spritePath.push(spriteList)
        this.scale=scale
        this.initialPosition=initialPosition
        this.#htmlComponent=document.createElement("img")
        this.#htmlComponent.id=entityId;
        this.#htmlComponent.src=this.spritePath[0]
        this.#htmlComponent.height=this.#htmlComponent.height*scale
        this.#htmlComponent.width=this.#htmlComponent.width*scale

        arenaElement.appendChild(this.#htmlComponent)

        this.#htmlComponent.style.position="absolute";
        this.#htmlComponent.style.top=initialPosition.y+"px"
        this.#htmlComponent.style.left=initialPosition.x+"px"
    }

    htmlElement(){
        return this.#htmlComponent
    }


}