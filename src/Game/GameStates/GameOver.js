import GameState from "./GameState";
import {initialize} from "./Initialize";

export const gameOver = "gameOver";

class GameOver extends GameState {
  constructor(game) {
    super(game, gameOver);
  }

  enterActions() {
    // Pass
  }

  render() {
    this.canvasHandler.drawText(
      "Game Over! Press any key to restart.",
      "center",
      "center",
      {
        color: "red",
        fontSize: 50,
      },
    );
  }

  handleInput(keys) {
    if (keys.length > 0) {
      this.game.setState(initialize);
    }
  }
}

export default GameOver;
