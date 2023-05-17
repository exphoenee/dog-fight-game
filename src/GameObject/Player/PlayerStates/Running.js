import State from "./State.js";
import {sitting} from "./Sitting.js";
import {jumping} from "./Jumping.js";
import {rolling} from "./Rolling.js";

export const running = "running";

class Running extends State {
  constructor(player) {
    super(running, player);
    console.log(this.player.frameY);
  }

  enterActions() {}

  handleInput(keys) {
    if (keys.includes(this.keyMap.ArrowDown)) {
      this.player.setState(sitting);
    } else if (keys.includes(this.keyMap.ArrowUp)) {
      this.player.setState(jumping);
    } else if (keys.includes(this.keyMap.Enter)) {
      this.player.setState(rolling);
    }
  }
}

export default Running;
