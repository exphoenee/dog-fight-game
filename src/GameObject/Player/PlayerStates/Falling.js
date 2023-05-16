import State from "./State";
import {running} from "./Running";
import {sitting} from "./Sitting";

export const falling = "falling";

class Falling extends State {
  constructor(player) {
    super(falling, player);
  }

  enterActions() {
    if (this.player.onGround()) {
      this.player.jumpSpeed = 0;
    }
  }

  handleInput() {
    if (this.player.onGround()) {
      this.player.setState(sitting);
    }
  }
}

export default Falling;
