import PlayerState from "./PlayerState";
import {sitting} from "./Sitting.js";
import {jumping} from "./Jumping.js";
import {rolling} from "./Rolling.js";
import {dizzy} from "./Dizzy";

import Dust from "../../Particles/Dust";

export const running = "running";

class Running extends PlayerState {
  constructor(player) {
    super(running, player);
  }

  enterActions() {
    this.game.gameSpeed = 10;
  }

  handleInput(keys) {
    new Dust(this.game, {
      positionX: this.player.positionX,
      positionY: this.player.positionY + this.player.height * 0.4,
    });
    if (keys.includes(this.keyMap.ArrowDown)) {
      this.player.setState(sitting);
    } else if (keys.includes(this.keyMap.ArrowUp)) {
      this.player.setState(jumping);
    } else if (keys.includes(this.keyMap.Enter)) {
      this.player.setState(rolling);
    }
    this.player.collisions?.enemy?.length > 0 && this.player.setState(dizzy);
  }
}

export default Running;
