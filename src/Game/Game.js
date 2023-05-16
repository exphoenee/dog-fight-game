import gameConfig from "./gameConfig";
import {
  playing,
  gameOver,
  gamePaused,
  loading,
  waitingStart,
} from "./gameStates";

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

    /* Game state */
    this.gameState = "loading";

    /* Canvas */
    this.canvasHandler = new CanvasHandler(this);
    this.canvas = this.canvasHandler.canvas;
    this.ctx = this.canvasHandler.ctx;
    this.groundLevel = this.canvas.height - 50;

    /* Game Objects */
    this.gameObjects = [];

    this.nrOfPlayers = 1;
    this.nrOfEnemies = 7;
    this.nrOfExplosions = 1;

    this.layerType = Object.keys(layerConfig)[0];
    this.nrOfLayers = layerConfig[this.layerType].properties.length;

    this.gameObjectsToLoad =
      this.nrOfLayers +
      this.nrOfPlayers +
      this.nrOfEnemies +
      this.nrOfExplosions;

    this.loadedGameObjects = 0;

    this.score = 0;
    this.lives = 3;

    this.createLayers(this.layerType);
    this.addPlayer();
    this.addExplosion();
    this.createEnemies();
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

  restartGame() {
    this.gameState = loading;
    this.gameObjects = [];
    this.gameState = waitingStart;
    this.score = 0;
    this.lives = 3;
  }

  playing() {
    this.gameObjects.sort((a, b) => a.zIndex - b.zIndex);
    this.gameObjects.sort((a, b) => a.positionY - b.positionY);
    this.gameObjects.forEach((obj) => {
      obj.update();
      if (this.lastTime >= this.fps) obj.draw();
    });
  }

  loading() {
    const loaded = this.loadedGameObjects / this.gameObjectsToLoad;
    if (loaded >= 1) {
      this.gameState = waitingStart;
    }
    this.canvasHandler.drawText(
      `Loading... ${Math.round(loaded > 1 ? 1 : loaded * 100)}%`,
      "center",
      "center",
      {
        color: "red",
        fontSize: 50,
      },
    );
  }

  waitingStart() {
    this.canvasHandler.drawText("Press Space to start", "center", "center", {
      color: "red",
      fontSize: 50,
    });
    if (this.keyboardHandler.lastKey === "SPACE_RELEASED") {
      this.gameState = playing;
    }
  }

  handleDebugMode() {
    if (this.keyboardHandler.lastKey === "D_PRESSED") {
      this.debugMode = true;
    }
    if (this.keyboardHandler.lastKey === "D_RELEASED") {
      this.debugMode = false;
    }
  }

  gameOver() {
    this.canvasHandler.drawText("Game Over!", "center", "center", {
      color: "red",
      fontSize: 50,
    });
  }

  gamePaused() {
    this.canvasHandler.drawText("Paused", "center", "center", {
      color: "red",
      fontSize: 50,
    });
  }

  update(timeStamp = 0) {
    this.canvasHandler.clear();

    if (this.gameState === waitingStart) this.waitingStart();
    if (this.gameState === loading) this.loading();
    if (this.gameState === gameOver) this.gameOver();
    if (this.gameState === gamePaused) this.gamePaused();
    this.handleDebugMode();

    this.gameFrame++;
    this.lastTime = timeStamp;
    if ([playing].includes(this.gameState)) this.playing();
    window.requestAnimationFrame(this.update.bind(this));
    this.deltaTime = timeStamp - this.lastTime ?? 0;
  }

  animate() {
    window.onload = () => {
      this.update();
    };
  }
}

export default Game;
