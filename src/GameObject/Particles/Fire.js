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
    this.width = 100;
    this.height = 90;
    this.angle = Math.random() * 360;
    this.angleSpeed = Math.random() * 2 - 1;
  }

  update() {
    this.angle += this.angleSpeed;
    this.positionX += this.speedX;
    this.positionY += this.speedY;
    if (this.opacity > 0.01) this.opacity -= 0.01;
    if (this.size > 1) this.size *= 0.95;
    else this.remove(this);
  }

  draw() {
    this.canvasHandler.drawParticle(this);
  }
}

export default Fire;
