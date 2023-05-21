import PlayerState from "./PlayerState";
import {sitting} from "./Sitting";
import { rolling } from "./Rolling";
import {dizzy} from "./Dizzy";

export const falling = "falling";

class Falling extends PlayerState {
  constructor(player) {
    super(falling, player);
  }

  enterActions() {
    this.game.gameSpeed = 10;
    if (this.player.onGround()) {
      this.player.jumpSpeed = 0;
    }
  }

  handleInput(keys) {
    if (this.player.onGround()) {
      this.player.setState(sitting);
    } else if (keys.includes(this.keyMap.Enter)) {
      this.player.setState(rolling);
    }
    this.player.collisions?.enemy?.length > 0 && this.player.setState(dizzy);
  }
}

export default Falling;
