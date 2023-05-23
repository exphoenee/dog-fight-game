import playerProperty from "../playerProperty";

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
