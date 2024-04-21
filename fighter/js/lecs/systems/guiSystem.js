import { HEALTH_COMPONENT, MELEE_COMPONENT, POSITION_COMPONENT } from "../components/constants.js";
import { BaseSystem } from "./baseSystem.js";
import { overlaps } from "./collisionSystem.js";

export class GuiSystem extends BaseSystem{
    
    #player1HpBarElement
    #player2HpBarElement
    #player1HpTextElement
    #player2HpTextElement

    #player1HealthComponent
    #player2HealthComponent
    constructor(player1Id,player2Id,componentManager,config={},logger){
        super(componentManager,logger)
        this.#player1HpBarElement=document.getElementById("heroHealth")
        this.#player2HpBarElement=document.getElementById("enemyHealth")

        this.#player1HpTextElement=document.getElementById("p1-health")
        this.#player2HpTextElement=document.getElementById("p2-health")



        this.#player1HealthComponent=componentManager.getEntityComponentByType(player1Id,HEALTH_COMPONENT)
        this.#player2HealthComponent=componentManager.getEntityComponentByType(player2Id,HEALTH_COMPONENT)
        //console.log("p1h ",this.#player1HealthComponent.currentHealth, "p2h ",this.#player2HealthComponent.currentHealth)
        this._setup()
    }

    _setup(){
        this.#player1HpBarElement.setAttribute("aria-valuemax",this.#player1HealthComponent.maxHealth);
        this.#player2HpBarElement.setAttribute("aria-valuemax",this.#player2HealthComponent.maxHealth);
        this.update();
        
    }

    _updateBars(){
        this.#player1HpTextElement.innerText="HP: "+this.#player1HealthComponent.currentHealth+"/"+this.#player1HealthComponent.maxHealth;
        this.#player2HpTextElement.innerText="HP: "+this.#player2HealthComponent.currentHealth+"/"+this.#player2HealthComponent.maxHealth;
        //let highestHealth=0;
        /*if (enemy.maxhealth>hero.maxhealth){
            highestHealth=enemy.maxhealth    
        }
        else{
            highestHealth=hero.maxhealth;
        }
        console.log("highest health ", highestHealth)*/

        

        //let heroPercentage=(index/hero.maxhealth)*100;
        //console.log("p1 hp percentage",this.#player1HealthComponent.percentage)
        this.#player1HpBarElement.setAttribute("aria-valuenow",this.#player1HealthComponent.percentage);
        this.#player1HpBarElement.style.width=this.#player1HealthComponent.percentage+"%";
        
        this.#player2HpBarElement.setAttribute("aria-valuenow",this.#player2HealthComponent.percentage);
        this.#player2HpBarElement.style.width=this.#player2HealthComponent.percentage+"%";
    }

    update(){
        this._updateBars();
    }

    

}