import State from "./State";
import {falling} from "./Falling";

export const jumping = "jumping";

class Jumping extends State {
  constructor(player) {
    super(jumping, player);
  }

  enterActions() {
    if (this.player.onGround()) {
      this.player.jumpSpeed = this.player.jumpHeight;
    }
    console.log(this.player.jumpHeight, this.player.weight);
  }

  handleInput() {
    if (this.player.jumpSpeed > this.player.weight) {
      this.player.setState(falling);
    }
  }

  update() {
    // this.player.positionY -= this.player.jumpSpeed;

    // if (!this.player.onGround) {
    //   this.player.jumpSpeed -= this.weight;
    // } else {
    //   this.player.positionY = this.player.groundLevel;
    //   this.player.jumpSpeed = 0;
    // }
    // console.log(this.player.jumpSpeed, this.player.weight);
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
