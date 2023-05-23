import GameState from "./GameState";
import {playing} from "./Playing";

export const pause = "pause";

class Pause extends GameState {
  constructor(game) {
    super(game, pause);
  }

  enterActions() {
    // Pass
  }

  render() {
    this.canvasHandler.drawText(
      "Paused press space to continue",
      "center",
      "center",
      {
        color: "red",
        fontSize: 50,
      },
    );
  }

  handleInput() {
    if (this.keys.includes(this.keyMap[" "])) {
      this.game.setState(playing);
    }
  }
}

export default Pause;
