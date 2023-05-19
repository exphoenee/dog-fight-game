import GameState from "./GameState";
import {playing} from "./Playing";

export const gameOver = "gameOver";

class GameOver extends GameState {
  constructor(game) {
    super(game, gameOver);
  }

  enterActions() {
    // Pass
  }

  render() {
    this.canvasHandler.drawText("Game Over!", "center", "center", {
      color: "red",
      fontSize: 50,
    });
  }

  handleInput(keys) {
    if (keys.includes(this.keyMap.Esc)) {
      this.game.setState(playing);
    }
  }
}

export default GameOver;
