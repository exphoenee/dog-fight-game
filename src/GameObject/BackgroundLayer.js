import GameObject from "./GameObject.js";

class BackgroundLayer extends GameObject {
  constructor(game, {imageName, speedModifier, name}) {
    super(game, {imageName, name});

    this.speedModifier = speedModifier;
    this.speed = this.game.gameSpeed * this.speedModifier;
    this.positionX = 0;
    this.positionY = 0;
    this.positionX2 = this.width;

    this.canvasWidth = this.game.canvasHandler.canvas.width;
    this.canvasHeight = this.game.canvasHandler.canvas.height;
  }

  update() {
    if (this.positionX <= -this.width * this.canvasHeight / this.height)
      this.positionX = Math.floor(this.width + this.positionX2 - this.speed);
    else this.positionX -= this.speed;
    if (this.positionX2 <= -this.width * this.canvasHeight / this.height)
      this.positionX2 = Math.floor(this.width + this.positionX - this.speed);
    else this.positionX2 -= this.speed;
  }

  draw() {
    this.game.canvasHandler.drawBackground(this);
  }
}

export default BackgroundLayer;
