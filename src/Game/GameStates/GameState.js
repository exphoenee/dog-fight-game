
// TODO: refactor it to use a class for every state, like in player states
class GameState {
  constructor(game, state) {
    this.name = state;
    this.game = game;
    this.player = game.player;
    this.keys = game.keyboardHandler.keys;
    this.keyMap = game.keyboardHandler.keyMap;
  }

  enterActions() {
    throw new Error("enterActions method not implemented");
  }

  enter() {
    this.enterActions();
  }

  handleInput() {
    throw new Error("handleInput method not implemented");
  }
}

export default GameState;