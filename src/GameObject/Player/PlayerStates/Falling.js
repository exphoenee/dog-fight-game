import PlayerState from "./PlayerState";
import {running} from "./Running";
import {sitting} from "./Sitting";
import {rolling} from "./Rolling";

export const falling = "falling";

class Falling extends PlayerState {
  constructor(player) {
    super(falling, player);
  }

  enterActions() {
    if (this.player.onGround()) {
      this.player.jumpSpeed = 0;
    }
  }

  handleInput(keys) {
    if (this.player.onGround()) {
      this.player.setState(sitting);
    } else if (keys.includes(this.keyMap.Enter)) {
      this.player.setState(rolling);
    }
  }
}

export default Falling;
