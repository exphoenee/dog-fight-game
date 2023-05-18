import GameState from "./GameState";
import {pause} from "./Pause";

export const gameOver = "gameOver";

class GameOver extends GameState {
  constructor(game) {
    super(game, GameOver);
  }

  enterActions() {
    // Pass
  }

  handleInput(keys) {
    if (
      this.keys.includes(
        this.keyMap[" "] || this.keys.includes(this.keyMap.Enter),
      )
    ) {
      this.game.setState(pause);
    }
  }
}

export default GameOver;
