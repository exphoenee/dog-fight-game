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

  handleInput() {
    this.handleEnergy(0.2);

    if (this.player.jumpSpeed > this.player.weight) {
      this.player.setState(falling);
    } else if (this.player.onGround()) {
      this.player.setState(sitting);
    } else if (this.keys.includes(this.keyMap.Enter) && !this.game.charging)
      this.player.setState(rolling, 2);
    else if (
      this.keys.includes(this.keyMap.ArrowDown) &&
      !this.game.charging &&
      !this.player.onGround()
    )
      this.player.setState(diving);
    this.player.collisions?.enemy?.length > 0 && this.player.setState(dizzy);
  }
}

export default Jumping;
