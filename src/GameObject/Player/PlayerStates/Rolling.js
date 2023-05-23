import PlayerState from "./PlayerState";
import {running} from "./Running";
import {falling} from "./Falling";

export const rolling = "rolling";

import Fire from "../../Particles/Fire";

class Rolling extends PlayerState {
  constructor(player) {
    super(rolling, player);
  }

  enterActions() {
    this.game.gameSpeed = 10;
    if (this.player.onGround()) {
      this.player.jumpSpeed = 0;
    }
  }

  handleInput() {
    new Fire(this.game, {
      positionX: this.player.positionX,
      positionY: this.player.positionY,
    });
    this.player.collisions?.enemy &&
      this.player.collisions.enemy.forEach((collision) => {
        if (collision.name === "enemy") {
          collision.remove();
          this.game.score++;
        }
      });
    if (!this.keys.includes(this.keyMap.Enter))
      this.player.setState(this.player.onGround() ? running : falling);
    else if (
      this.keys.includes(this.keyMap.Enter) &&
      this.keys.includes(this.keyMap.ArrowUp) &&
      this.player.onGround()
    ) {
      this.player.jumpSpeed = -this.player.jumpHeight * 0.85;
    }
  }
}

export default Rolling;
