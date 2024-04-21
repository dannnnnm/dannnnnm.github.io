import { getRndInteger } from "../utils/utils.js";
import { BaseComponent } from "./baseComponent.js";

export class OwnerComponent extends BaseComponent{
    
    ownerId
    damage
    #enabled
    constructor(entityId,ownerId,damage=0){
        super(entityId)
        this.ownerId=ownerId
        this.damage=damage
        this.#enabled=true
    }


    get enabled(){
        return this.#enabled
    }

    disable(){
        this.#enabled=false
    }
    
}