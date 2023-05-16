import State from "./State.js";
import {sitting} from "./Sitting.js";
import {jumping} from "./Jumping.js";

export const running = "running";

class Running extends State {
  constructor(player) {
    super(running, player);
    console.log(this.player.frameY);
  }

  enterActions() {}

  handleInput(keys) {
    if ([...keys].includes(this.keyMap.ArrowDown)) {
      this.player.setState(sitting);
    }
    if ([...keys].includes(this.keyMap.ArrowUp)) {
      this.player.setState(jumping);
    }
    if ([...keys].includes(this.keyMap.ArrowLeft)) {
      this.player.speedX = -this.player.maxSpeedX;
    }
    if ([...keys].includes(this.keyMap.ArrowRight)) {
      this.player.speedX = this.player.maxSpeedX;
    }
  }
}

export default Running;
