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

  handleInput(keys) {
    if (keys.includes(this.keyMap.Esc)) {
      this.game.setState(pause);
    }
  }
}

export default Playing;
