import State from "./State";
import {falling} from "./Falling";
import {sitting} from "./Sitting";
import {rolling} from "./Rolling";

export const jumping = "jumping";

class Jumping extends State {
  constructor(player) {
    super(jumping, player);
  }

  enterActions() {
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
    }
  }
}

export default Jumping;