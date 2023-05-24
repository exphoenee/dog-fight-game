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

  handleInput() {
    this.handleEnergy(0.5);
    if (
      this.keys.includes(this.keyMap.ArrowLeft) ||
      this.keys.includes(this.keyMap.ArrowRight)
    )
      this.player.setState(running);
    else if (this.keys.includes(this.keyMap.ArrowUp))
      this.player.setState(jumping);
    else if (
      this.keys.includes(this.keyMap.Enter) &&
      this.game.energy > this.game.maxEnergy / 2 &&
      !this.game.charging
    )
      this.player.setState(rolling, 2);

    this.player.collisions?.enemy?.length > 0 && this.player.setState(dizzy);
  }
}

export default Sitting;
