import PlayerState from "./PlayerState";
import {running} from "./Running";
import {falling} from "./Falling";

export const rolling = "rolling";

class Rolling extends PlayerState {
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
    else if (
      keys.includes(this.keyMap.Enter) &&
      keys.includes(this.keyMap.ArrowUp) &&
      this.player.onGround()
    ) {
      this.player.jumpSpeed = -this.player.jumpHeight * 0.85;
    }
  }
}

export default Rolling;
