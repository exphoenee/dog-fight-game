import State from "./State";
import {falling} from "./Falling";
import {sitting} from "./Sitting";

export const jumping = "jumping";

class Jumping extends State {
  constructor(player) {
    super(jumping, player);
  }

  enterActions() {
    if (this.player.onGround()) {
      console.log("jumping");
      this.player.jumpSpeed = -this.player.jumpHeight;
    }
  }

  handleInput() {
    if (this.player.jumpSpeed > this.player.weight) {
      this.player.setState(falling);
    }
    if (this.player.onGround()) {
      this.player.setState(sitting);
    }
  }
}

export default Jumping;