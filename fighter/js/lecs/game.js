import { CollisionComponent } from "./components/collisionComponent.js";
import { arenaElement } from "./components/constants.js";
import { HealthComponent } from "./components/healthComponent.js";
import { MeleeComponent } from "./components/meleeComponent.js";
import { PositionComponent } from "./components/positionComponent.js";
import { ProjectileComponent } from "./components/projectileComponent.js";
import { RenderComponent } from "./components/renderComponent.js";
import { ComponentManager } from "./managers/componentManager.js";
import { EntityManager } from "./managers/entityManager.js";
import { SystemManager } from "./managers/systemManager.js";
import { AttackSystem } from "./systems/attackSystem.js";
import { CollisionSystem } from "./systems/collisionSystem.js";
import { GuiSystem } from "./systems/guiSystem.js";
import { InputSystem } from "./systems/inputSystem.js";
import { MovementSystem } from "./systems/movementSystem.js";
import { RenderSystem } from "./systems/renderSystem.js";

export const MOVEMENT_SPEED = 10;
const ENGINE_SPEED = 20;
export class Game{
  #componentManager;
  #systemManager;
  #entityManager;
  #player1Id;
  #player2Id;
  gameUpdateId
  #projectilesplayer
  #speed;

  constructor(config = {}) {
    config = {
      /*canvasWidth: RESOLUTION_WIDTH,
      canvasHeight: RESOLUTION_HEIGHT,
      scaleFactor: SCALE_FACTOR,
      engineSpeed: ENGINE_SPEED,
      loggingEnabled: true,
      ...config,*/
      engineSpeed: ENGINE_SPEED,
      ...config
    };

    this.#speed = config.engineSpeed;

    this.#componentManager = new ComponentManager();
    this.#systemManager = new SystemManager();
    this.#entityManager = new EntityManager();

    // Entities & components
    this.#player1Id = this.#entityManager.addEntity("player1");
    this.#player2Id = this.#entityManager.addEntity("player2");

    this._initComponents()


    // Systems
    const inputSystem = new InputSystem(
      this.#player1Id,this.#player2Id,
      this.#componentManager,
      {
        movementSpeed: MOVEMENT_SPEED,
      },

    );

    const collisionSystem= new CollisionSystem(
      this.#player1Id,
      this.#player2Id,
      this.#componentManager,
      {},
    );


    const attackSystem= new AttackSystem(this.#player1Id,this.#player2Id,this.#componentManager,this.#entityManager,{},)


    const movementSystem = new MovementSystem(
      this.#componentManager,
      {}, // No config

    );
    const renderSystem = new RenderSystem(
      this.#player1Id,
      this.#player2Id,
      this.#componentManager,
      {},

    );

    const guiSystem= new GuiSystem(this.#player1Id,this.#player2Id,this.#componentManager,{},)

    this.#systemManager.addSystem(inputSystem);
    this.#systemManager.addSystem(collisionSystem);
    this.#systemManager.addSystem(attackSystem);
    this.#systemManager.addSystem(movementSystem);
    this.#systemManager.addSystem(renderSystem);

    this.#systemManager.addSystem(guiSystem);

    //this.#systemManager.info();
  }

  _initComponents(){
    let arenaBounds=arenaElement.getBoundingClientRect();



    const positionComponent1 = new PositionComponent(this.#player1Id, arenaBounds.left+10, arenaBounds.top+10,true);
    this.#componentManager.addComponent(positionComponent1);

    const positionComponent2 = new PositionComponent(this.#player2Id, 100, 75,true);
    



    const renderComponent1 = new RenderComponent(this.#player1Id, ["images/gat.png"], positionComponent1.asVector(), 0.2);
    this.#componentManager.addComponent(renderComponent1);
    
    const renderComponent2 = new RenderComponent(this.#player2Id, ["images/chopper.png"], positionComponent2.asVector(), 0.2);
    this.#componentManager.addComponent(renderComponent2);


    //depende del rendercomponent
    positionComponent2.x=arenaBounds.right-renderComponent2.htmlElement().width-10;
    positionComponent2.y=arenaBounds.bottom-renderComponent2.htmlElement().height-10;
    this.#componentManager.addComponent(positionComponent2);



    const healthComponent1= new HealthComponent(this.#player1Id);
    this.#componentManager.addComponent(healthComponent1)

    const healthComponent2= new HealthComponent(this.#player2Id);
    this.#componentManager.addComponent(healthComponent2)



    //melee

    const meleeComponent1= new MeleeComponent(this.#player1Id);
    this.#componentManager.addComponent(meleeComponent1)

    const meleeComponent2= new MeleeComponent(this.#player2Id);
    this.#componentManager.addComponent(meleeComponent2)


    //projectile

    const projectileComponent1=new ProjectileComponent(this.#player1Id)
    this.#componentManager.addComponent(projectileComponent1)

    const projectileComponent2=new ProjectileComponent(this.#player2Id)
    this.#componentManager.addComponent(projectileComponent2)



    const player1SpriteDimensions=renderComponent1.htmlElement();
    const collisionComponentPlayer1= new CollisionComponent(this.#player1Id,positionComponent1.asVector(),player1SpriteDimensions.width,player1SpriteDimensions.height)
    this.#componentManager.addComponent(collisionComponentPlayer1)

    const player2SpriteDimensions=renderComponent2.htmlElement();
    const collisionComponentPlayer2= new CollisionComponent(this.#player2Id,positionComponent2.asVector(),player2SpriteDimensions.width,player2SpriteDimensions.height)
    this.#componentManager.addComponent(collisionComponentPlayer2)
  }

  

  start() {
    this._update();
  }

  _update() {
    this.#systemManager.update(this.#player1Id,this.#player2Id);
    this.gameUpdateId = setTimeout(this._update.bind(this), this.#speed);
  }
}