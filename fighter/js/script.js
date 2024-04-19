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




  
  //Creación de personajes
  const hero = new Character("Heroe", getRndInteger(1,100), 110);
  const enemy = new Character("Limo", getRndInteger(1,100), 40);
  let heroBar=document.getElementById("heroHealth");
  let enemyBar=document.getElementById("enemyHealth");

  let pressedKeys=[]
  const speed=5

  //repres
  let heroRepr=document.getElementById("heroRepr")
  let enemyRepr=document.getElementById("enemyRepr")
    
  function setup(){
    
    heroBar.setAttribute("aria-valuemax",hero.maxhealth);
    enemyBar.setAttribute("aria-valuemax",enemy.maxhealth);    
  }

  function setupDocumentPositions(){
    let arenaBound=document.getElementById("arenaZone").getBoundingClientRect();
    console.log("arena top ", document.getElementById("arenaZone").getBoundingClientRect())
    heroRepr.style.top=arenaBound.top+10+"px";
    heroRepr.style.left=arenaBound.left+10+"px"

    enemyRepr.style.top=arenaBound.bottom-enemyRepr.getBoundingClientRect().height+"px";
    enemyRepr.style.left=arenaBound.right-enemyRepr.getBoundingClientRect().width+"px";
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


function move(direction,repr){
  if (willBeOOB(repr,direction)){
    return;
  }
  if (direction=="u"){
    repr.style.top=(parseFloat(repr.style.top) || 0) - speed + 'px';
  }
  else if(direction=="r"){
    repr.style.left=(parseFloat(repr.style.left) || 0) + speed + 'px';
  }
  else if (direction=="d"){
    repr.style.top=(parseFloat(repr.style.top) || 0) + speed + 'px';
  }
  else if (direction=="l"){
    repr.style.left=(parseFloat(repr.style.left) || 0) - speed + 'px';
  }
}



function willBeOOB(repr,direction){
let arena=document.getElementById("arenaZone");
switch (direction) {
  case "u":
    if (repr.getBoundingClientRect().top<arena.getBoundingClientRect().top){
      console.log("pos: ",heroRepr.getBoundingClientRect().top,arena.getBoundingClientRect().top)
      return true
    }
    break;
  case "d":
    if (repr.getBoundingClientRect().bottom+10>arena.getBoundingClientRect().bottom){
      console.log("pos: ",heroRepr.getBoundingClientRect().bottom,arena.getBoundingClientRect().bottom)
      return true
    }
    break;
  case "l":
    if (repr.getBoundingClientRect().left-9<arena.getBoundingClientRect().left){
      console.log("pos: ",heroRepr.getBoundingClientRect().left,arena.getBoundingClientRect().left)
      return true
    }
    break;
    case "r":
      if (repr.getBoundingClientRect().right+10>arena.getBoundingClientRect().right){
        console.log("pos: ",heroRepr.getBoundingClientRect().left,arena.getBoundingClientRect().left)
        return true
      }
      break;

  default:
    break;
}
}



setup()
fillBars();
calculateHealthBar();

window.onload=setupDocumentPositions();

alert("Vida héroe (z): "+hero.maxhealth+"\n Vida enemigo (n): "+enemy.maxhealth)

  

window.onkeydown=function(key){
  if (pressedKeys.indexOf(key.key)!=-1){
    return
  }
    console.log("keydown ",key.key)
    if (key.key=='z'){
        attack(hero,enemy)
        
    }
    else if (key.key=='n'){
        attack(enemy,hero)
    }
    else if (key.key=='ArrowDown'){
      pressedKeys.push(key.key)
    }
    else if (key.key=='ArrowUp'){
      pressedKeys.push(key.key)
    }
    else if (key.key=='ArrowLeft'){
      pressedKeys.push(key.key)
    }
    else if (key.key=='ArrowRight'){
      pressedKeys.push(key.key)
    }
    else if (key.key=="w"){
      pressedKeys.push(key.key)
    }
    else if (key.key=="s"){
      pressedKeys.push(key.key)
    }
    else if (key.key=="a"){
      pressedKeys.push(key.key)
    }
    else if (key.key=="d"){
      pressedKeys.push(key.key)
    }
    console.log("pressed keys ",pressedKeys)
}

function executeMovement(){
  
    pressedKeys.forEach(key=> {
      if (key=='ArrowDown'){
        move("d",heroRepr)
      }
      else if (key=='ArrowUp'){
        move("u",heroRepr)
      }
      else if (key=='ArrowLeft'){
        move("l",heroRepr)
      }
      else if (key=='ArrowRight'){
        move("r",heroRepr)
      }
      else if (key=="w"){
        move("u",enemyRepr)
      }
      else if (key=="s"){
        move("d",enemyRepr)
      }
      else if (key=="a"){
        move("l",enemyRepr)
      }
      else if (key=="d"){
        move("r",enemyRepr)
      }
      
    });
    
  
}

window.setInterval(executeMovement,20)

window.onkeyup=function(key){
  let index=pressedKeys.indexOf(key.key)
  if (index!=-1){
    console.log("keyup ",key.key)
    pressedKeys.splice(index,1)
  }
}
