
// TODO: refactor it to use a class for every state, like in player states
class GameState {
  constructor(state, game) {
    this.name = state;
    this.game = game;
    this.player = game.player;
    this.keyMap = game.keyboardHandler.keyMap;
    this.keys = game.keyboardHandler.keys;
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

const getStates = (game) => (
