import PlayerState from "./PlayerState";
import {sitting} from "./Sitting";
import {falling} from "./Falling";

export const dizzy = "dizzy";

class Dizzy extends PlayerState {
  constructor(player) {
    super(dizzy, player);
    this.dizzyTime = 0;
  }

  enterActions() {
    console.log(this.player.dizzyTime);
    this.dizzyTime = this.player.dizzyTime;
    this.game.gameSpeed = 0;
  }

  handleInput() {
    this.dizzyTime -= this.game.deltaTime;
    console.log(this.dizzyTime);
    if (this.dizzyTime <= 0)
      this.player.setState(this.player.onGround() ? sitting : falling);
  }
}

export default Dizzy;
