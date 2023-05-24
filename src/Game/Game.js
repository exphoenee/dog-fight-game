import gameConfig from "./gameConfig";
import getGameStates from "./gameStates";
import {initialize} from "./GameStates/Initialize";

// constants
import layerConfig from "../GameObject/BackgroundLayer/layerConfig";

import KeyboardHandler from "../KeyboardHandler/KeyboardHandler";
import CanvasHandler from "../CanvasHandler/CanvasHandler";

import Player from "../GameObject/Player/Player";

import Enemy from "../GameObject/Enemy/Enemy";
import Explosion from "../GameObject/Explosion/Explosion";

class Game {
  constructor() {
    Object.assign(this, {...gameConfig});

    /* Keyboard Handler */
    this.keyboardHandler = new KeyboardHandler();

    /* Canvas */
    this.canvasHandler = new CanvasHandler(this);
    this.canvas = this.canvasHandler.canvas;
    this.ctx = this.canvasHandler.ctx;
    this.groundLevel = this.canvas.height - 50;

    /* Game Objects */
    this.gameObjects = [];
    this.particles = [];
    this.floatingMessages = [];

    this.layerType = Object.keys(layerConfig)[0];
    this.nrOfLayers = layerConfig[this.layerType].properties.length;

    this.score = 0;
    this.lives = 3;
    this.charging = false;
    this.maxEnergy = 100;
    this.energy = this.maxEnergy;

    this.createLayers(this.layerType);
    this.addPlayer();
    this.addExplosion();
    this.createEnemies();

    /* Game state */
    this.gameStates = getGameStates(this);
    this.currentState = this.gameStates[initialize];
    this.currentState.enter();
  }

  setState(state) {
    this.currentState = this.gameStates[state];
    this.currentState.enter();
  }

  addExplosion(optionalProperties = {positionX: 200, positionY: 200}) {
    new Explosion(this, optionalProperties);
  }

  addPlayer() {
    new Player(this);
  }

  addEnemy(optionalProperties = {positionX: 0, positionY: 150}) {
    new Enemy(this, optionalProperties);
  }

  createEnemies() {
    for (let i = 0; i < 7; i++) {
      this.nrOfEnemies = i;
      this.addEnemy({
        positionX: Math.floor(200 + Math.random() * 400),
        positionY: Math.floor(100 + Math.random() * 400),
        type: i,
      });
    }
  }

  createLayers(type) {
    if (!type) throw new Error("No layer type specified");
    const {properties, Layer} = layerConfig[type];
    this.nrOfLayers = properties.length;
    properties.forEach((layer) => new Layer(this, layer));
  }

  update(timeStamp = 0) {
    this.canvasHandler.clear();

    this.currentState.handleInput(this.keyboardHandler.keys);
    this.currentState.render();

    this.gameFrame++;
    this.deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;

    window.requestAnimationFrame(this.update.bind(this));
  }

  animate() {
    window.onload = () => {
      this.update();
    };
  }
}

export default Game;
