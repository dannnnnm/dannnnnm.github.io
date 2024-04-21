//Ejercicio de practica Javascript

import { Game } from "./lecs/game.js";



  
    
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

function sleep(millis){
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}




let game=new Game();
game.start();
let resetButton=document.getElementById("resetButton")
resetButton.onclick=function (btn){
                                  clearTimeout(game.gameUpdateId)
                                  game.stop()
                                  game=new Game();
                                  game.start();
                                  resetButton.blur()
                              };

var audio=new Audio("audio/freedoom.m4a")
audio.volume=0.33
audio.loop=true

let toggleMusic=document.getElementById("stopMusic")
toggleMusic.onclick=function(){
  console.log("called")
  if (!audio.paused){
    audio.pause()
  }
  else{
    audio.play()
    document.getElementById("statusParagraph").textContent=""
  }
  toggleMusic.blur()
}


audio.play().then(
  (result)=>{
    audio.muted=false
  },
  (error)=>{
    let parent=document.getElementById("musicStatus");
    let paragraph= document.createElement("p")
    paragraph.id="statusParagraph"
    paragraph.textContent="(Could not autoplay music)"
    parent.appendChild(paragraph)
    
    
    
  }
)
