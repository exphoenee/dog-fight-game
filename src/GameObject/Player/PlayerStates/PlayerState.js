class PlayerState {
  constructor(state, player) {
    this.name = state;
    this.player = player;
    this.keyMap = player.game.keyboardHandler.keyMap;
  }

  enterActions() {
    throw new Error("enterActions method not implemented");
  }

  enter() {
    this.player.frameY = this.player.stateAnim[this.name].frameY;
    this.enterActions();
  }

  handleInput() {
    throw new Error("handleInput method not implemented");
  }
}

export default PlayerState;
