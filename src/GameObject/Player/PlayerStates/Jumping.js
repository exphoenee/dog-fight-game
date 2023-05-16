import State from "./State";
import {falling} from "./Falling";

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

  handleInput() {
    if (this.player.jumpSpeed > this.player.weight) {
      this.player.setState(falling);
    }
  }
}

export default Jumping;