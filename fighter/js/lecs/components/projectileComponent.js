import { getRndInteger } from "../utils/utils.js";
import { BaseComponent } from "./baseComponent.js";

export class ProjectileComponent extends BaseComponent{
    #willAttack
    #damageMax
    #damageMin
    ownerId
    cooledDown
    constructor(entityId,damageMin=5,damageMax=10){
        super(entityId)
        this.#willAttack=false;
        this.#damageMin=damageMin
        this.#damageMax=damageMax
        this.cooledDown=true
    }

    get canAttack(){
        return this.cooledDown
    }

    recoverAttack(){
        let cancellationId=setTimeout(function(){
            this.cooledDown=true
            clearTimeout(cancellationId)
        }.bind(this),500)
    }

    
    



    prepared(){
        return this.#willAttack
    }



    prepareAttack(){
        if (this.cooledDown){
            this.#willAttack=true
            this.cooledDown=false
        }
        
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