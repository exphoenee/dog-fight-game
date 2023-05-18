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
    if (this.game.loadedGameObjects == this.game.gameObjectsToLoad) {
      this.game.setState(waitingStart);
    }
  }
}

export default Initialize;
