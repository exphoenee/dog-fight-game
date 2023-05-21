import PlayerState from "./PlayerState";
import {running} from "./Running";
import {rolling} from "./Rolling";

export const diving = "diving";

import Fire from "../../Particles/Fire";

class Diving extends PlayerState {
  constructor(player) {
    super(diving, player);
  }

  enterActions() {
    this.game.gameSpeed = 0;
    this.player.jumpSpeed = 0;
  }

  handleInput(keys) {
    new Fire(this.game, {
      positionX: this.player.positionX,
      positionY: this.player.positionY,
    });
    if (this.player.onGround()) this.player.setState(running);
    else if (keys.includes(this.keyMap.Enter)) this.player.setState(rolling);
  }
}

export default Diving;
