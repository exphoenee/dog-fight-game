import PlayerState from "./PlayerState";
import {running} from "./Running";
import {rolling} from "./Rolling";

export const diving = "diving";

import Fire from "../../Particles/Fire";
import Splash from "../../Particles/Splash";

class Diving extends PlayerState {
  constructor(player) {
    super(diving, player);
  }

  enterActions() {
    this.game.gameSpeed = 0;
    this.player.jumpSpeed = 25;
  }

  handleInput() {
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
    } else if (this.keys.includes(this.keyMap.Enter))
      this.player.setState(rolling);
    this.player.collisions?.enemy &&
      this.player.collisions.enemy.forEach((collision) => {
        if (collision.name === "enemy") {
          collision.remove();
          this.game.score++;
        }
      });
  }
}

export default Diving;
