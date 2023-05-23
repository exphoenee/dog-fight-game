class GameState {
  constructor(game, state) {
    this.name = state;
    this.game = game;
    this.player = game.player;
    this.keyMap = game.keyboardHandler.keyMap;
    this.keyboardHandler = game.keyboardHandler;
    this.canvasHandler = game.canvasHandler;
  }

  get keys() {
    return this.game.keyboardHandler.keys;
  }

  enterActions() {
    throw new Error("enterActions method not implemented");
  }

  enter() {
    this.enterActions();
  }

  render() {
    throw new Error("render method not implemented");
  }

  handleInput() {
    throw new Error("handleInput method not implemented");
  }
}

export default GameState;
