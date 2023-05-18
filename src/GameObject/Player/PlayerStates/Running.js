import PlayerState from "./PlayerState";
import {sitting} from "./Sitting.js";
import {jumping} from "./Jumping.js";
import {rolling} from "./Rolling.js";

import Dust from "../../Particles/Dust";

export const running = "running";

class Running extends PlayerState {
  constructor(player) {
    super(running, player);
    console.log(this.player.frameY);
  }

  enterActions() {}

  handleInput(keys) {
    new Dust(this.player.game, {
      x: this.player.positionX,
      y: this.player.positionY + this.player.height / 2,
      size: 10,
      color: "black",
    });
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
