import GameState from "./GameState";
import {playing} from "./Playing";

export const waitingStart = "waitingStart";

class WaitingStart extends GameState {
  constructor(game) {
    super(game, waitingStart);
  }

  enterActions() {
    // Pass
  }

  render() {
    this.game.canvasHandler.drawText(
      "Press Space to start",
      "center",
      "center",
      {
        color: "red",
        fontSize: 50,
      },
    );
  }

  handleInput(keys) {
    console.log(this.keyboardHandler.keyMap);
    if (
      keys.includes(this.keyboardHandler.keyMap.Esc) ||
      keys.includes(this.keyboardHandler.keyMap.Enter) ||
      keys.includes(this.keyboardHandler.keyMap[" "])
    ) {
      console.log("first");
      this.game.setState(playing);
    }
  }
}

export default WaitingStart;
