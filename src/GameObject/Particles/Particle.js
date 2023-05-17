import {v4 as uuid} from "uuid";

class Particle {
  constructor(game, {x, y, size, color, speedX, speedY}) {
    this.game = game;
    this.id = uuid();

    this.positionX = x;
    this.positionY = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.alpha = 1;

    this.game.particles.length < 200 && this.game.particles.push(this);
  }

  remove() {
    this.game.particles = this.game.particles.filter(
      (elem) => this.id !== elem.id,
    );
  }

  update() {
    this.positionX += this.speedX;
    this.positionY += this.speedY;
    this.alpha -= 0.01;
    this.size *= 0.95;

    if (this.size < 0.1) {
      this.remove(this);
    }
  }

  draw() {
    throw new Error("Particle draw method not implemented.");
  }
}

export default Particle;