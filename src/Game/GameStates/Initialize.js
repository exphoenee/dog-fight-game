import GameState from "./GameState";
import {loading} from "./Loading";

export const initialize = "initialize";

class Initialize extends GameState {
  constructor(game) {
    super(game, initialize);
  }

  enterActions() {
    // Pass
  }

  handleInput(keys) {
    if (keys.includes(this.keyMap.Esc)) {
      this.game.setState(loading);
    }
  }
}

export default Initialize;
