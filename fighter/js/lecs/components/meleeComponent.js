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
        }.bind(this),350)
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
        
        let missSound=new Audio("audio/whoosh.m4a")
        this.#willAttack=false
        this.recoverAttack()
        missSound.play()
    }
}