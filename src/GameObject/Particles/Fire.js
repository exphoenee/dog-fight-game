import Particle from "./Particle.js";

class Fire extends Particle {
  constructor(game, {positionX, positionY}) {
    super(game, {
      positionX,
      positionY,
      size: Math.random() * 10 + 20,
      speedX: 0,
      speedY: Math.random() * -1,
      color: "black",
      opacity: 0.5,
      image: "fire",
      name: "fire",
    });
    this.size = Math.random() * 2 + 1;
    this.width = 100;
    this.height = 90;
    this.angle = Math.random() * 0.2 + 0.1;
    this.angleSpeed = Math.random() * 0.5 + 1;
    this.sizeChangeSpeed = 0.97
  }

  update() {
    this.angle += this.angleSpeed;
    this.positionX += Math.sin(this.angle) * 1 + this.speedX;
    this.positionY += this.speedY;
    if (this.opacity > 0.01) this.opacity -= 0.01;
    if (this.size > 0.5) this.size *= this.sizeChangeSpeed;
    else this.remove(this);
  }

  draw() {
    this.canvasHandler.drawParticle(this, {rotate: this.angle});
  }
}

export default Fire;
