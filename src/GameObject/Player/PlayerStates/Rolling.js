import State from "./State";
import {rolling} from "./Rolling";
import {running} from "./Running";
import {sitting} from "./Sitting";

export const falling = "falling";

class Rolling extends State {
  constructor(player) {
    super(rolling, player);
  }

  enterActions() {
    if (this.player.onGround()) {
      this.player.jumpSpeed = 0;
    }
  }

  handleInput() {
    if (!keys.includes(this.keyMap.Enter))
      player.setState(this.player.onGround() ? running : falling);
  }
}

export default Rolling;
