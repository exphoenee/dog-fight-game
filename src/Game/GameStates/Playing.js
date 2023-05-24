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
      particle.update();
      if (this.game.lastTime >= this.game.fps) particle.draw();
    });
    this.game.floatingMessages.forEach((message) => {
      message.update();
      if (this.game.lastTime >= this.game.fps) message.draw();
    });

    // dashBoard
    this.canvasHandler.drawText(`Score: ${this.game.score}`, 10, 30, {
      color: "black",
      fontSize: 30,
      align: "left",
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowColor: "white",
    });
    this.canvasHandler.drawText(`Lives: ${this.game.lives}`, 10, 55, {
      color: "black",
      fontSize: 20,
      align: "left",
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowColor: "white",
    });
    this.canvasHandler.drawText(
      `Time: ${(this.game.lastTime / 1000).toFixed(1)}`,
      10,
      80,
      {
        color: "black",
        fontSize: 20,
        align: "left",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: "white",
      },
    );
    this.canvasHandler.drawText(
      `Charge: ${this.game.energy.toFixed(1)}`,
      10,
      105,
      {
        color: this.game.charging ? "red" : "black",
        fontSize: 20,
        align: "left",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: "white",
      },
    );
  }

  handleInput() {
    if (this.keys.includes(this.keyMap.Escape)) {
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
