import PlayerState from "./PlayerState";

import {falling} from "./Falling";
import {sitting} from "./Sitting";
import {rolling} from "./Rolling";
import {diving} from "./Diving";
import {dizzy} from "./Dizzy";

export const jumping = "jumping";

class Jumping extends PlayerState {
  constructor(player) {
    super(jumping, player);
  }

  enterActions() {
    this.game.gameSpeed = 10;
    if (this.player.onGround()) {
      this.player.jumpSpeed = -this.player.jumpHeight;
    }
  }

  handleInput(keys) {
    if (this.player.jumpSpeed > this.player.weight) {
      this.player.setState(falling);
    } else if (this.player.onGround()) {
      this.player.setState(sitting);
    } else if (keys.includes(this.keyMap.Enter)) {
      this.player.setState(rolling, 2);
    } else if (keys.includes(this.keyMap.ArrowDown)) {
      this.player.setState(diving);
    }
    this.player.collisions?.enemy?.length > 0 && this.player.setState(dizzy);
  }
}

export default Jumping;
