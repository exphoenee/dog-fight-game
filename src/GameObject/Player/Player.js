import GameObject from "../GameObject";
import playerProperty from "./playerProperty";

import playerStates, {
  idle,
  jump,
  fall,
  run,
  dizzy,
  sitting,
  roll,
  bite,
  ko,
  getHit,
} from "./PlayerStates";

class Player extends GameObject {
  constructor(game, optionalProperties) {
    super(game, {...playerProperty, ...optionalProperties});

    this.groundLevel = this.game.groundLevel - this.height / 2;
    this.positionX = this.width;
    this.positionY = this.groundLevel;

    this.jumpSpeed = 0;
    this.weight = 1;

    this.setCanCollideWith(["enemy"]);

    this.states = playerStates(this);

    this.currentState = this.states[sitting];
    this.currentState.enter();
  }

  jump() {
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

  attack() {
    this.positionY += this.speedY;
    this.setState("fall");
  }

  left() {
    this.positionX -= this.speedX;
    if (this.positionX - this.width / 2 < 0) {
      this.positionX = this.width / 2;
    }
    this.setState("run");
  }

  right() {
    this.positionX += this.speedX;
    if (this.positionX > this.game.canvas.width - this.width / 2) {
      this.positionX = this.game.canvas.width - this.width / 2;
    }
    this.setState("run");
  }

  get onGround() {
    return this.positionY >= this.groundLevel;
  }

  update() {
    this.jump();

    this.collisions = this.getCollisions();

    const {frameNrX, frameY} = this.stateAnim[this.state];
    this.frameY = frameY;
    this.frameX =
      Math.floor(this.game.gameFrame / this.game.staggerFrames) % frameNrX;
  }
}

export default Player;
