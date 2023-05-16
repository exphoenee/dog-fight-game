import State from "./State";
import {running} from "./Running";
import {falling} from "./Falling";

export const rolling = "rolling";

class Rolling extends State {
  constructor(player) {
    super(rolling, player);
  }

  enterActions() {
    if (this.player.onGround()) {
      this.player.jumpSpeed = 0;
    }
  }

  handleInput(keys) {
    if (!keys.includes(this.keyMap.Enter))
      this.player.setState(this.player.onGround() ? running : falling);
  }
}

export default Rolling;
