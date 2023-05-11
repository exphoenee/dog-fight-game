import State from "./State";
import {running} from "./Running";

export const falling = "falling";

class Falling extends State {
  constructor(player) {
    super(falling, player);
  }

  enterActions() {
    if (this.player.onGround()) {
      this.player.jumpSpeed = this.player.jumpSpeedValue;
    }
  }

  handleInput() {
    if (this.player.onGround()) {
      this.player.setState(running);
    }
  }
}

export default Falling;
