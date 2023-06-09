class CanvasHandler {
  constructor(game) {
    this.game = game;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.width = game.width;
    this.height = game.height;
    this.canvas.width = game.width;
    this.canvas.height = game.height;
    document.body.appendChild(this.canvas);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawHitBox(gameObject) {
    const options = {color: "red", opacity: 0.5};

    this.drawCircle(gameObject.positionX, gameObject.positionY, 3, options);
    this.drawRectangle(
      gameObject.positionX - gameObject.offsetX,
      gameObject.positionY - gameObject.offsetY,
      gameObject.width * gameObject.sizeFactor,
      gameObject.height * gameObject.sizeFactor,
      options
    );
    this.drawText(
      Math.round(gameObject.sizeFactor * 100) / 100,
      gameObject.positionX,
      gameObject.positionY - 20,
      {...options, color: "white", opacity: 1}
    );
  }

  drawCircle(x, y, radius, options) {
    const {color, opacity} = {...{color: "black", opacity: 1}, ...options};

    this.drawWithStyle({opacity}, () => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
  }

  drawRectangle(x, y, width, height, options) {
    const {color, opacity, filled} = {
      ...{color: "black", opacity: 1, filled: true},
      ...options,
    };
    this.drawWithStyle({opacity}, () => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.rect(x, y, width, height);
      this.ctx.stroke();
    });
    filled &&
      this.drawWithStyle({opacity} / 3, () => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
      });
  }

  drawWithStyle({opacity, mirrored}, cb) {
    this.ctx.save();
    mirrored && this.ctx.scale(-1, 1);
    this.ctx.globalAlpha = opacity;
    cb();
    this.ctx.restore();
  }

  drawText(text, x, y, options) {
    const {font, fontSize, color, weight, align, baseline, opacity} = {
      ...{
        font: "serif",
        fontSize: 20,
        color: "black",
        weight: "normal",
        align: "center",
        baseline: "alphabetic",
        opacity: 1,
      },
      ...options,
    };
    if (x === "center") x = this.width / 2;
    if (y === "center") y = this.height / 2;
    this.drawWithStyle({opacity}, () => {
      const fontStyle = [weight, `${fontSize}px`, font]
        .filter((style) => !!style)
        .join(" ");
      this.ctx.font = fontStyle;
      this.ctx.fillStyle = color;
      this.ctx.textAlign = align;
      this.ctx.textBaseline = baseline;
      this.ctx.fillText(text, x, y);
    });
  }

  drawSprite(gameObject, opacity = 1) {
    const {mirrored} = gameObject;
    this.drawWithStyle(
      {
        opacity: gameObject?.opacity ?? opacity,
        mirrored,
      },
      () => {
        this.ctx.drawImage(
          gameObject.image,
          gameObject.frameX * gameObject.spriteWidthRaw,
          gameObject.frameY * gameObject.spriteHeightRaw,
          gameObject.spriteWidthRaw,
          gameObject.spriteHeightRaw,
          gameObject.positionX -
            gameObject.offsetX +
            gameObject.width * (mirrored ? -1 : 0),
          gameObject.positionY - gameObject.offsetY,
          gameObject.width * gameObject.sizeFactor * (mirrored ? -1 : 1),
          gameObject.height * gameObject.sizeFactor
        );
      }
    );
  }

  drawLine(x1, y1, x2, y2, color, width, opacity = 1) {
    this.ctx.save();
    this.ctx.globalAlpha = opacity;
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawBackground(background, opacity = 1) {
    this.drawWithStyle({opacity: background?.opacity ?? opacity}, () => {
      this.ctx.drawImage(
        background.image,
        background.positionX,
        background.positionY,
        (background.width * background.canvasHeight) / background.height,
        background.canvasHeight
      );
      this.ctx.drawImage(
        background.image,
        background.positionX2,
        background.positionY,
        (background.width * background.canvasHeight) / background.height,
        background.canvasHeight
      );
    });
  }

  drawGameObject(gameObject, opacity = 1) {
    this.drawSprite(gameObject, opacity);
    this.game.debugMode && this.drawHitBox(gameObject, opacity);
  }
}

export default CanvasHandler;
