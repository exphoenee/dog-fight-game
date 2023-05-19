import GameState from "./GameState";
import {pause} from "./Pause";

export const playing = "playing";

class Playing extends GameState {
  constructor(game) {
    super(game, playing);
  }

  enterActions() {
    // Pass
  }

  render() {
    this.game.gameObjects.sort((a, b) => a.zIndex - b.zIndex);
    this.game.gameObjects.sort((a, b) => a.positionY - b.positionY);
    this.game.gameObjects.forEach((obj) => {
      obj.update();
      if (this.lastTime >= this.fps) obj.draw();
    });
    this.particles.forEach((particle) => {
      particle.update();
      if (this.lastTime >= this.fps) particle.draw();
    });
  }

  handleInput(keys) {
    if (keys.includes(this.keyMap.Esc)) {
      this.game.setState(pause);
    }
  }
}

export default Playing;
