import PlayerState from "./PlayerState";
import {running} from "./Running";
import {sitting} from "./Sitting";
import {falling} from "./Falling";

export const diving = "diving";

import Fire from "../../Particles/Fire";
import Splash from "../../Particles/Splash";
import Explosion from "../../Explosion/Explosion";
import FloatingMessages from "../../FloatingMessages/FloatingMessages";

class Diving extends PlayerState {
  constructor(player) {
    super(diving, player);
  }

  enterActions() {
    this.game.gameSpeed = 0;
    this.player.jumpSpeed = 25;
  }

  handleInput() {
    this.handleEnergy(-3);

    new Fire(this.game, {
      positionX: this.player.positionX,
      positionY: this.player.positionY,
    });
    if (this.player.onGround()) {
      this.player.setState(running);
      for (let i = 0; i < 30; i++) {
        new Splash(this.game, {
          positionX: this.player.positionX,
          positionY: this.player.positionY + this.player.height * 0.7,
        });
      }
    } else if (this.game.energy < this.game.maxEnergy / 2 && this.game.charging)
      this.player.setState(this.player.onGround() ? sitting : falling);

    this.player.collisions?.enemy &&
      this.player.collisions.enemy.forEach((otherObject) => {
        if (otherObject.name === "enemy") {
          otherObject.remove();
          this.game.score++;
          new Explosion(this.game, {
            positionX: otherObject.positionX,
            positionY: otherObject.positionY,
          });
          new FloatingMessages(this.game, {
            text: "+1",
            x: otherObject.positionX,
            y: otherObject.positionY,
            targetX: 90,
            targetY: 25,
          });
        }
      });
  }
}

export default Diving;
