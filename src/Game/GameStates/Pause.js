import GameState from "./GameState";
import {playing} from "./Playing";

export const pause = "pause";

class Pause extends GameState {
  constructor(game) {
    super(game, pause);
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

export default Pause;
