import GameState from "./GameState";
import {pause} from "./Pause";

export const playing = "playing";

class Playing extends GameState {
  constructor(game) {
    super(game, playing);
  }

  enterActions() {
    // Pass
  }

  render() {
    this.game.gameObjects.sort((a, b) => a.zIndex - b.zIndex);
    this.game.gameObjects.sort((a, b) => a.positionY - b.positionY);
    this.game.gameObjects.forEach((obj) => {
      obj.update();
      if (this.game.lastTime >= this.game.fps) obj.draw();
    });
    this.game.particles.forEach((particle) => {
      particle.game.update();
      if (this.game.lastTime >= this.game.fps) particle.draw();
    });

    // dashBoard
    this.canvasHandler.drawText(`Score: ${this.game.score}`, 10, 30, {
      color: "red",
      fontSize: 20,
      align: "left",
    });
    this.canvasHandler.drawText(`Lives: ${this.game.lives}`, 10, 60, {
      color: "red",
      fontSize: 20,
      align: "left",
    });
  }

  handleInput(keys) {
    if (keys.includes(this.keyMap.Escape)) {
      this.game.setState(pause);
    }
    if (this.game.lives <= 0) {
      this.game.setState(gameOver);
    }
    if (this.keyboardHandler.lastKey === "D_PRESSED") {
      this.game.debugMode = true;
    }
    if (this.keyboardHandler.lastKey === "D_RELEASED") {
      this.game.debugMode = false;
    }
  }
}

export default Playing;
