import PlayerState from "./PlayerState";
import {sitting} from "./Sitting";
import {falling} from "./Falling";

export const dizzy = "dizzy";

class Dizzy extends PlayerState {
  constructor(player) {
    super(dizzy, player);
  }

  enterActions() {
    this.game.gameSpeed = 0;
  }

  handleInput() {
    if (this.player.frameX === 10)
      this.player.setState(this.player.onGround() ? sitting : falling);
  }
}

export default Dizzy;
