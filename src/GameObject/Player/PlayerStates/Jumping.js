import State from "./State";

export const jumping = "jumping";

class Jumping extends State {
  constructor(player) {
    super(jumping, player);
  }

  enterActions() {
    if (this.player.onGround()) {
      this.player.jumpSpeed = this.player.jumpSpeedValue;
    }
  }

  handleInput(keys) {
    if (this.player.jumpSpeed > this.player.weight) {
      this.player.setState(falling);
    }
  }
}

export default Jumping;

function jump() {
  this.positionY -= this.jumpSpeed;

  if (!this.onGround) {
    this.jumpSpeed -= this.weight;
    this.setState("jump");
  } else {
    this.positionY = this.groundLevel;
    this.jumpSpeed = 0;
  }
  if (this.game.keyboardHandler.lastKey === "UP_PRESSED") {
    if (this.onGround) this.jumpSpeed = 30;
  }
}

function attack() {
  this.positionY += this.speedY;
  this.setState("fall");
}
