import playerProperty from "../playerProperty";

import {sitting} from "./Sitting";

class PlayerState {
  constructor(state, player) {
    this.name = state;
    this.game = player.game;
    this.player = player;
    this.keyMap = player.game.keyboardHandler.keyMap;
    if (!(this.name in playerProperty.stateAnim)) {
      throw new Error(
        `PlayerState ${this.name} not found in playerProperty stateAnim.`,
      );
    }
    this.frameNrX = this.player.stateAnim[this.name].frameNrX;
    this.frameY = this.player.stateAnim[this.name].frameY;
  }

  get keys() {
    return this.game.keyboardHandler.keys;
  }

  handleEnergy(val) {
    this.game.energy += val;
    this.game.energy >= this.game.maxEnergy &&
      (this.game.energy = this.game.maxEnergy);
    if (this.game.energy <= 0) {
      this.game.charging = true;
      this.game.energy = 0;
    }
    if (this.game.energy >= 50) {
      this.game.charging = false;
    }
  }

  enterActions() {
    throw new Error("enterActions method not implemented");
  }

  enter() {
    this.player.frameY = this.frameY;
    this.player.frameNrX = this.frameNrX;
    this.enterActions();
  }

  handleInput() {
    throw new Error("handleInput method not implemented");
  }
}

export default PlayerState;
