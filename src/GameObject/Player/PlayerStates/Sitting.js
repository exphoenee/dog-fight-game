import PlayerState from "./PlayerState";

import {running} from "./Running.js";
import {jumping} from "./Jumping.js";
import {rolling} from "./Rolling.js";
import {dizzy} from "./Dizzy";

export const sitting = "sitting";

class Sitting extends PlayerState {
  constructor(player) {
    super(sitting, player);
  }

  enterActions() {
    this.game.gameSpeed = 0;
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
    this.player.collisions?.enemy?.length > 0 && this.player.setState(dizzy);
  }
}

export default Sitting;
