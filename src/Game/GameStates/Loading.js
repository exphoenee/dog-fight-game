import GameState from "./GameState";
import {playing} from "./Playing";

export const loading = "loading";

class Loading extends GameState {
  constructor(game) {
    super(game, loading);
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

export default Loading;
