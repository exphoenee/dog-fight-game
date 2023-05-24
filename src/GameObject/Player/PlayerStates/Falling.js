import PlayerState from "./PlayerState";
import {sitting} from "./Sitting";
import {rolling} from "./Rolling";
import {dizzy} from "./Dizzy";
import {diving} from "./Diving";

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

  handleInput() {
    this.handleEnergy(0.2);

    if (this.player.onGround()) {
      this.player.setState(sitting);
    } else if (this.keys.includes(this.keyMap.Enter) && !this.game.charging)
      this.player.setState(rolling);
    else if (
      this.keys.includes(this.keyMap.ArrowDown) &&
      !this.game.charging &&
      !this.player.onGround()
    )
      this.player.setState(diving);

    this.player.collisions?.enemy?.length > 0 && this.player.setState(dizzy);
  }
}

export default Falling;
