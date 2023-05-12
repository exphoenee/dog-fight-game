import {running} from "./Running.js";
import {jumping} from "./Jumping.js";
import State from "./State.js";

export const sitting = "sitting";

class Sitting extends State {
  constructor(player) {
    super(sitting, player);
  }

  enterActions() {}

  handleInput(keys) {
    if (
      [...keys].includes(this.keyMap.ArrowLeft) ||
      [...keys].includes(this.keyMap.ArrowRight)
    ) {
      this.player.setState(running);
    }
    if ([...keys].includes(this.keyMap.ArrowUp)) {
      this.player.setState(jumping);
    }
  }
}

export default Sitting;
