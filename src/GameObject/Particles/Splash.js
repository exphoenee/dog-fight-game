import Particle from "./Particle.js";

class Splash extends Particle {
  constructor(game, {positionX, positionY}) {
    super(game, {
      positionX,
      positionY,
      speedX: Math.random() * 6 - 3,
      speedY: Math.random() * 2 + 2,
      color: "black",
      opacity: 0.5,
      image: "fire",
      name: "splash",
    });
    this.size = 0.5;
    this.width = 100;
    this.height = 90;
    this.gravity = 0;
    this.sizeChangeSpeed = 0.95;
  }

  update() {
    this.gravity += 0.1;
    // this.positionX += Math.sin(this.angle) * 1 + this.speedX;
    // this.positionY += this.gravity;
    if (this.opacity > 0.01) this.opacity -= 0.01;
    if (this.size > 0.5) this.size *= this.sizeChangeSpeed;
    else this.remove(this);
  }

  draw() {
    this.canvasHandler.drawParticle(this);
  }
}

export default Splash;
