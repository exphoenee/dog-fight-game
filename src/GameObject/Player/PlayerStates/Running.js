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
    if ([...keys].includes(this.keyMap.ArrowLeft)) {
      // this.left();
    }
    if ([...keys].includes(this.keyMap.ArrowRight)) {
      // this.right();
    }
  }

  left() {
    this.player.positionX -= this.player.speedX;
    if (this.player.positionX - this.player.width / 2 < 0) {
      this.player.positionX = this.player.width / 2;
    }
  }

  right() {
    this.player.positionX += this.player.speedX;
    if (
      this.player.positionX >
      this.player.game.canvas.width - this.player.width / 2
    ) {
      this.player.positionX =
        this.player.game.canvas.width - this.player.width / 2;
    }
  }

  update() {}
}

export default Running;
