import Particle from "./Particle.js";

class Dust extends Particle {
  constructor(game, {positionX, positionY}) {
    super(game, {
      positionX,
      positionY,
      size: Math.random() * 5 + 10,
      speedX: Math.random() * -1,
      speedY: Math.random() * -1,
      color: "black",
      opacity: 0.3,
      name: "dust",
    });
  }

  update() {
    this.positionX += this.speedX;
    this.positionY += this.speedY;
    if (this.opacity > 0.01) this.opacity -= 0.01;
    if (this.size > 1) this.size *= 0.95;
    else this.remove(this);
  }

  draw() {
    this.canvasHandler.drawCircle(this.positionX, this.positionY, this.size, {
      color: this.color,
      opacity: this.opacity,
      fillColor: this.color,
      fillOpacity: this.opacity,
    });
  }
}

export default Dust;
