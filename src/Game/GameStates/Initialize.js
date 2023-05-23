import GameState from "./GameState";
import {loading} from "./Loading";

export const initialize = "initialize";

class Initialize extends GameState {
  constructor(game) {
    super(game, initialize);
  }

  enterActions() {
    this.game.gameObjects = [];
    this.game.particles = [];
    this.game.score = 0;
    this.game.lives = 3;
  }

  handleInput() {
    this.game.setState(loading);
  }
}

export default Initialize;
