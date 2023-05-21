import {v4 as uuid} from "uuid";

class Particle {
  constructor(
    game,
    {positionX, positionY, size, color, opacity, speedX, speedY, texture},
  ) {
    this.game = game;
    this.canvasHandler = this.game.canvasHandler;
    this.id = uuid();

    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.opacity = opacity ?? 1;

    this.imageName = texture;

    this.image = new Image();
    const loadImage = async () => {
      this.image.src = `./assets/${this.imageName}.png`;
      try {
        await this.image.decode();
        this.game.particles.length < 300 && this.game.particles.push(this);
        this.isLoading = false;
      } catch (e) {
        this.error = true;
        throw new Error(`Error loading image ${this.imageName}`);
      }
    };
    if (texture) loadImage();
    else this.game.particles.length < 1000 && this.game.particles.push(this);
  }

  remove() {
    this.game.particles = this.game.particles.filter(
      (elem) => this.id !== elem.id,
    );
  }

  update() {
    throw new Error("Particle update method not implemented.");
  }

  draw() {
    throw new Error("Particle draw method not implemented.");
  }
}

export default Particle;