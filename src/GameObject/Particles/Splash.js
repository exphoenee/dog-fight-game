import Particle from "./Particle.js";

class Splash extends Particle {
  constructor(game, {positionX, positionY}) {
    super(game, {
      positionX,
      positionY,
      image: "fire",
      opacity: 0.75,
      name: "splash",
    });

    this.startTime = this.game.gameFrame;
    this.size = Math.random() * 0.1 + 0.1;
    this.width = 100;
    this.height = 90;
    this.gravity = -8;
    this.accX = Math.random() * 3 - 1.5;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 0.3 + 0.2;
  }

  update() {
    this.gravity += this.speedY;
    this.accX += this.speedX;
    this.positionX += this.accX;
    this.positionY += this.gravity;
    if (this.game.gameFrame - this.startTime > 3 * 16) this.opacity -= 0.03;
    this.opacity <= 0 && this.remove();
  }

  draw() {
    // this.canvasHandler.ctx.drawImage(this.image, this.positionX, this.positionY,this.size, this.size);
    this.canvasHandler.drawParticle(this);
  }
}

export default Splash;
