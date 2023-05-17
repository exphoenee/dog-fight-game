import Particle from "./Particle.js";

class Dust extends Particle {
  constructor(game, {x, y, size, color, speedX, speedY}) {
    super(game, {x, y, size, color, speedX, speedY});
    this.size = Math.random() * 10 + 10;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = "black";
    this.alpha = 0.5;
  }

  draw() {
    this.game.canvasHandler.drawCircle(
      this.positionX,
      this.positionY,
      this.size,
      {color: this.color, opacity: this.alpha},
    );
  }
}

export default Dust;
