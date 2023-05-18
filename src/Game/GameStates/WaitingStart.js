import GameState from "./GameState";
import {playing} from "./Playing";

export const waitingStart = "waitingStart";

class WaitingStart extends GameState {
  constructor(game) {
    super(game, waitingStart);
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

export default WaitingStart;
