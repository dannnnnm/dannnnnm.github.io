import { BaseComponent } from "./baseComponent.js";

export class ManaComponent extends BaseComponent{
    currentMana
    #maxMana
    #regenManaInterval
    isRecovering
    meleeDrainAmount = 10
    proyectileDrainAmount = 15
    constructor(entityId, maxMana=100, regenManaInterval=200){
        super(entityId)
        this.#maxMana=maxMana
        this.currentMana=this.#maxMana;
        this.#regenManaInterval=regenManaInterval
        this.isRecovering=false
    }

    drainMelee(){
        this.currentMana-=this.meleeDrainAmount;
        if(this.currentMana<0)
            this.currentMana=0;
        
    }

    recoverMana(){
        let cancellationId=setTimeout(function(){
            this.currentMana+=1
            console.log("regen ",this.currentMana)
            this.isRecovering=false
            clearTimeout(cancellationId)
        }.bind(this),this.#regenManaInterval)
        
    }

    drainShoot(){
        this.currentMana-=this.proyectileDrainAmount;
        if(this.currentMana<0)
            this.currentMana=0;
    }

    get currentMana() {
        return this.currentMana;
    }

    get maxMana() {
        return this.#maxMana;
    }

    get percentage(){
        return (this.currentMana/this.#maxMana)*100
    }
}