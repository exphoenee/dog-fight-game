import {running} from "./Running.js";
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
  }
}

export default Sitting;
