import {v4 as uuid} from "uuid";

class FloatingMessages {
  constructor(game, {text, x, y, targetX, targetY}) {
    this.id = uuid();
    this.game = game;
    this.canvasHandler = game.canvasHandler;
    this.name = "FloatingMessage";
    this.text = text;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.time = 0;
    this.opacity = 1;

    console.log("new message");

    this.game.floatingMessages.push(this);
  }

  remove() {
    this.game.floatingMessages = this.game.floatingMessages.filter(
      (message) => message.id !== this.id,
    );
  }

  update() {
    this.x += (this.targetX - this.x) * 0.05;
    this.y += (this.targetY - this.y) * 0.05;
    this.time += this.game.deltaTime;
    if (this.time >= 500) this.opacity -= 0.01;
    if (this.opacity <= 0.01) this.remove();
  }

  draw() {
    this.canvasHandler.drawText(this.text, this.x, this.y, {
      color: "white",
      opacity: this.opacity,
      fontSize: 30,
      align: "center",
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowColor: "black",
    });
  }
}

export default FloatingMessages;
