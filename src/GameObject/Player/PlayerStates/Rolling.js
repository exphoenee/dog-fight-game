import PlayerState from "./PlayerState";
import {running} from "./Running";
import {falling} from "./Falling";
import {sitting} from "./Sitting";

export const rolling = "rolling";

import Fire from "../../Particles/Fire";
import Explosion from "../../Explosion/Explosion";

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
    this.handleEnergy(-1);

    new Fire(this.game, {
      positionX: this.player.positionX,
      positionY: this.player.positionY,
    });
    this.player.collisions?.enemy &&
      this.player.collisions.enemy.forEach((otherObject) => {
        if (otherObject.name === "enemy") {
          otherObject.remove();
          this.game.score++;
          new Explosion(this.game, {
            positionX: otherObject.positionX,
            positionY: otherObject.positionY,
          });
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
    } else if (this.game.energy < this.game.maxEnergy && this.game.charging)
      this.player.setState(this.player.onGround() ? sitting : falling);
  }
}

export default Rolling;
