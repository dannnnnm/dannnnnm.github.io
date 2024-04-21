import { getRndInteger } from "../utils/utils.js";
import { BaseComponent } from "./baseComponent.js";

export class MeleeComponent extends BaseComponent{
    #willAttack
    #damageMax
    #damageMin
    constructor(entityId,damageMin=5,damageMax=10){
        super(entityId)
        this.#willAttack=false;
        this.#damageMin=damageMin
        this.#damageMax=damageMax
    }


    prepared(){
        return this.#willAttack
    }



    prepareAttack(){
        this.#willAttack=true
    }



    attack(){
        if (this.#willAttack){
            this.#willAttack=false
            return getRndInteger(this.#damageMin,this.#damageMax)
        }
        return 0;
    }


    miss(){
        this.#willAttack=false
    }
}