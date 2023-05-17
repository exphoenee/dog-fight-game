import GameObject from "../GameObject";
import explosionProperties from "./explosionProperties";

class Explosion extends GameObject {
  constructor(game, optionalProperties) {
    super(game, {
      ...explosionProperties,
      ...optionalProperties,
    });
  }
  update() {
    const {frameNrX, frameY} = this.stateAnim[this.state];
    this.frameY = frameY;
    this.frameX =
      Math.floor(this.game.gameFrame / this.staggerFrames) % frameNrX;
    if (this.frameX === frameNrX - 1) {
      this.remove();
    }
  }
}

export default Explosion;
