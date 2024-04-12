//Ejercicio de practica Javascript

//Objeto base para los personajes
class Character {
    constructor(name, health, damage) {
      //Atributos
      this.name = name;
      this.health = health;
      this.maxhealth = health;
      this.damage = damage;
    }
    //Verifica si el personaje esta vivo
    isAlive() {
      return this.health > 0;
    }
  
    //Ataca a otro personaje seleccionado
    attack(target) {
      console.log(`${this.name} deals ${this.damage} DMG to ${target.name}`);
      target.health -= getRndInteger(5,10);
    }
  
    //Retorna la información actual del personaje
    status() {
      return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
  }
  
  //Función para combatir
  async function fight(firstCharacter, secondCharacter) {
    setup();
    await fillBars();
    console.log("Empieza el combate!");
    console.log(hero.status());
    console.log(enemy.status());
    sleep(2000);
    
    while (true) {
        sleep(900);
  
      //Primer personaje ataca si esta vivo
      if (firstCharacter.isAlive()) {
        firstCharacter.attack(secondCharacter);
        console.log(hero.status());
        console.log(enemy.status());
      } else {
        console.log(`${firstCharacter.name} died!`);
        firstCharacter.health=0;
        calculateHealthBar()
        break;
      }
  
      //Segundo personaje ataca si esta vivo
      if (secondCharacter.isAlive()) {
        secondCharacter.attack(firstCharacter);
        console.log(hero.status());
        console.log(enemy.status());
      } else {
        secondCharacter.health=0;
        calculateHealthBar()
        console.log(`${secondCharacter.name} died!`);
        break;
      }

      calculateHealthBar()
    }
  }



  
  //Creación de personajes
  const hero = new Character("Heroe", getRndInteger(1,100), 110);
  const enemy = new Character("Limo", getRndInteger(1,100), 40);
  let heroBar=document.getElementById("heroHealth");
  let enemyBar=document.getElementById("enemyHealth");
    
  function setup(){
    heroBar.setAttribute("aria-valuemax",hero.maxhealth);
    enemyBar.setAttribute("aria-valuemax",enemy.maxhealth);
  }

  async function fillBars(){
    document.getElementById("p1-health").innerText=hero.health+"/"+hero.maxhealth;
    document.getElementById("p2-health").innerText=enemy.health+"/"+enemy.maxhealth;
    let highestHealth=0;
    if (enemy.maxhealth>hero.maxhealth){
        highestHealth=enemy.maxhealth    
    }
    else{
        highestHealth=hero.maxhealth;
    }
    console.log("highest health ", highestHealth)

    /*for (let index = 0; index < highestHealth; index++) {
        //new Promise((resolve) => setTimeout(resolve, 0.2));
        sleep(5)
        if (index<=hero.maxhealth){
            let percentage=(index/hero.maxhealth)*100;
            heroBar.setAttribute("aria-valuenow",percentage);
            heroBar.style.width=percentage+"%";
            console.log("aria-valuenow ",heroBar.getAttribute("aria-valuenow"));
        }
        if (index<=enemy.maxhealth){
            let percentage=(index/enemy.maxhealth)*100;
            enemyBar.setAttribute("aria-valuenow",percentage);
            enemyBar.style.width=percentage+"%";
            requestAnimationFrame(function() {
                enemyBar.style.opacity = ''; // Reset to default value
              });
            console.log("aria-valuenow ",heroBar.getAttribute("aria-valuenow"));
        }
        requestAnimationFrame(function() {
            heroBar.style.opacity = '0.9999';
            enemyBar.style.opacity = '0.9999'; // Trigger repaint
    requestAnimationFrame(function() {
      heroBar.style.opacity = ''; // Reset to default value
      enemyBar.style.opacity = ''; // Reset to default value
    });
        });
    }*/

    //let heroPercentage=(index/hero.maxhealth)*100;
    heroBar.setAttribute("aria-valuenow",hero.maxhealth);
    heroBar.style.width=hero.maxhealth+"%";

    enemyBar.setAttribute("aria-valuenow",enemy.maxhealth);
    enemyBar.style.width=enemy.maxhealth+"%";
    
  }


  function calculateHealthBar(){
    document.getElementById("p1-health").innerText=hero.health+"/"+hero.maxhealth;
    document.getElementById("p2-health").innerText=enemy.health+"/"+enemy.maxhealth;

    let percentage=(hero.health/hero.maxhealth)*100;
    if (percentage<0){
        percentage=0;
    }
    console.log("hero percent ",percentage)
    heroBar.setAttribute("aria-valuenow",percentage);
    heroBar.style.width=percentage+"%";
    console.log("aria-valuenow ",heroBar.getAttribute("aria-valuenow"));
    heroBar.offsetHeight;

    percentage=(enemy.health/enemy.maxhealth)*100;
    if (percentage<0){
        percentage=0;
    }
    enemyBar.setAttribute("aria-valuenow",percentage);
    enemyBar.style.width=percentage+"%";

  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  function sleep(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function attack(attacker,attacked){
    if (!attacker.isAlive()){
        console.log("attacker is dead")
        return;
    }
    if (!attacked.isAlive()){
        console.log("attacked is dead!")
        return;
    }
    attacker.attack(attacked)
    calculateHealthBar()
}


  //Comenzar combate
  
//fight(hero, enemy);
setup()
fillBars();
calculateHealthBar();

alert("Vida héroe (z): "+hero.maxhealth+"\n Vida enemigo (n): "+enemy.maxhealth)

window.onkeydown=function(key){
    console.log(key)
    if (key.key=='z'){
        attack(hero,enemy)
        
    }
    else if (key.key=='n'){
        attack(enemy,hero)
    }
}