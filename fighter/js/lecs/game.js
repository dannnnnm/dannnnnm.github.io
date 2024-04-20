import { CollisionComponent } from "./components/collisionComponent.js";
import { arenaElement } from "./components/constants.js";
import { PositionComponent } from "./components/positionComponent.js";
import { RenderComponent } from "./components/renderComponent.js";
import { ComponentManager } from "./managers/componentManager.js";
import { EntityManager } from "./managers/entityManager.js";
import { SystemManager } from "./managers/systemManager.js";
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
  #gameUpdateId
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

    

    let arenaBounds=arenaElement.getBoundingClientRect();
    const positionComponent1 = new PositionComponent(this.#player1Id, arenaBounds.left+10, arenaBounds.top+10,true);
    const positionComponent2 = new PositionComponent(this.#player2Id, 100, 75,true);
    const renderComponent1 = new RenderComponent(this.#player1Id, ["images/gat.png"], positionComponent1.asVector(), 0.2);
    const renderComponent2 = new RenderComponent(this.#player2Id, ["images/chopper.png"], positionComponent2.asVector(), 0.2);

    const player1SpriteDimensions=renderComponent1.htmlElement().getBoundingClientRect();
    const collisionComponentPlayer1= new CollisionComponent(this.#player1Id,positionComponent1.asVector(),player1SpriteDimensions.width,player1SpriteDimensions.height)

    const player2SpriteDimensions=renderComponent1.htmlElement().getBoundingClientRect();
    const collisionComponentPlayer2= new CollisionComponent(this.#player2Id,positionComponent2.asVector(),player2SpriteDimensions.width,player2SpriteDimensions.height)

    //this.#componentManager.addComponent(worldComponent);
    this.#componentManager.addComponent(positionComponent1);
    this.#componentManager.addComponent(renderComponent1);
    this.#componentManager.addComponent(positionComponent2);
    this.#componentManager.addComponent(renderComponent2);

    // Systems
    const inputSystem = new InputSystem(
      this.#componentManager,
      {
        movementSpeed: MOVEMENT_SPEED,
      },

    );
    const movementSystem = new MovementSystem(
      this.#componentManager,
      {}, // No config

    );
    const renderSystem = new RenderSystem(
      this.#componentManager,
      {},

    );

    this.#systemManager.addSystem(inputSystem);
    this.#systemManager.addSystem(movementSystem);
    this.#systemManager.addSystem(renderSystem);

    //this.#systemManager.info();
  }

  _initComponents(){
    
  }

  start() {
    this._update();
  }

  _update() {
    this.#systemManager.update(this.#player1Id,this.#player2Id);
    this.#gameUpdateId = setTimeout(this._update.bind(this), this.#speed);
  }
}