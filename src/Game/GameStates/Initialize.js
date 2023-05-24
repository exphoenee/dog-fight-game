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
    this.floatingMessages = [];
    this.game.score = 0;
    this.game.lives = 3;
    this.maxEnergy = 100;
    this.energy = this.maxEnergy;
    this.game.lastTime = 0;
    this.charging = false;
  }

  handleInput() {
    this.game.setState(loading);
  }
}

export default Initialize;
