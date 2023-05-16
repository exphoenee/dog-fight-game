import {running} from "./Running.js";
import {jumping} from "./Jumping.js";
import {rolling} from "./Rolling.js";
import State from "./State.js";

export const sitting = "sitting";

class Sitting extends State {
  constructor(player) {
    super(sitting, player);
  }

  enterActions() {
    //pass
  }

  handleInput(keys) {
    if (
      keys.includes(this.keyMap.ArrowLeft) ||
      keys.includes(this.keyMap.ArrowRight)
    ) {
      this.player.setState(running);
    } else if (keys.includes(this.keyMap.ArrowUp)) {
      this.player.setState(jumping);
    } else if (keys.includes(this.keyMap.Enter)) {
      this.player.setState(rolling, 2);
    }
  }
}

export default Sitting;
