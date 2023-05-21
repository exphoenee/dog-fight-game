import playerProperty from "../playerProperty";

class PlayerState {
  constructor(state, player) {
    this.name = state;
    this.game = player.game;
    this.player = player;
    this.keyMap = player.game.keyboardHandler.keyMap;
    this.frameNrX = playerProperty[this.name].frameNrX;
    this.frameY = playerProperty[this.name].frameY;
  }

  enterActions() {
    throw new Error("enterActions method not implemented");
  }

  enter() {
    this.player.stateAnim = this.name;
    this.player.frameY = this.frameY;
    this.player.frameNrX = this.frameNrX;
    this.enterActions();
  }

  handleInput() {
    throw new Error("handleInput method not implemented");
  }
}

export default PlayerState;
