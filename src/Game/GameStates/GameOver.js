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

  handleInput(keys) {
    if (keys.includes(this.keyMap.Esc)) {
      this.game.setState(playing);
    }
  }
}

export default GameOver;
