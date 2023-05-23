import GameState from "./GameState";
import {waitingStart} from "./WaitingStart";

export const loading = "loading";

class Loading extends GameState {
  constructor(game) {
    super(game, loading);
  }

  enterActions() {
    // pass
  }

  render() {
    const loaded =
      this.game.gameObjects.reduce(
        (acc, obj) => acc + (obj.isLoading ? 0 : 1),
        0,
      ) / this.game.gameObjects.length;

    console.log(loaded);
    this.canvasHandler.drawText(
      `Loading... ${Math.round(loaded > 1 ? 1 : loaded * 100)}%`,
      "center",
      "center",
      {
        color: "red",
        fontSize: 50,
      },
    );
  }

  handleInput() {
    if (this.game.gameObjects.every((obj) => !obj.isLoading)) {
      this.game.setState(waitingStart);
    }
  }
}

export default Loading;
