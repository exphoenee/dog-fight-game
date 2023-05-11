import State from "./State.js";
import {sitting} from "./Sitting.js";
import {jumping} from "./Jumping.js";

export const running = "running";

class Running extends State {
  constructor(player) {
    super(running, player);
  }

  enterActions() {}

  handleInput(keys) {
    if ([...keys].includes(this.keyMap.ArrowDown)) {
      this.player.setState(sitting);
    }
    if ([...keys].includes(this.keyMap.ArrowUp)) {
      this.player.setState(jumping);
    }
  }
}

export default Running;

function left() {
  this.positionX -= this.speedX;
  if (this.positionX - this.width / 2 < 0) {
    this.positionX = this.width / 2;
  }
  this.setState("run");
}

function right() {
  this.positionX += this.speedX;
  if (this.positionX > this.game.canvas.width - this.width / 2) {
    this.positionX = this.game.canvas.width - this.width / 2;
  }
  this.setState("run");
}
