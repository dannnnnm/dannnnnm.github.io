import { getRndInteger } from "../utils/utils.js";
import { BaseComponent } from "./baseComponent.js";

export class MeleeComponent extends BaseComponent{
    #willAttack
    #damageMax
    #damageMin
    cooledDown
    constructor(entityId,damageMin=5,damageMax=10){
        super(entityId)
        this.#willAttack=false;
        this.#damageMin=damageMin
        this.#damageMax=damageMax
        this.cooledDown=true
    }


    prepared(){
        return this.#willAttack
    }

    recoverAttack(){
        let cancellationId=setTimeout(function(){
            this.cooledDown=true
            clearTimeout(cancellationId)
        }.bind(this),250)
    }


    prepareAttack(){
        console.log("on preparing...", this)
        if(this.cooledDown){
            this.#willAttack=true
            this.cooledDown=false
        }
        
    }



    attack(){
        if (this.#willAttack){
            this.#willAttack=false
            this.recoverAttack()
            return getRndInteger(this.#damageMin,this.#damageMax)
        }
        return 0;
    }


    miss(){
        this.#willAttack=false
    }
}