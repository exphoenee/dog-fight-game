import GameObject from "../GameObject";
import playerProperty from "./playerProperty";

import getPlayerStates from "./PlayerStates";
import {sitting} from "./PlayerStates/Sitting";

class Player extends GameObject {
  constructor(game, optionalProperties) {
    super(game, {...playerProperty, ...optionalProperties});

    this.groundLevel = this.game.groundLevel - this.height / 2;
    this.positionX = this.width;
    this.positionY = this.groundLevel;

    this.jumpSpeed = 0;

    this.setCanCollideWith(["enemy"]);

    this.states = getPlayerStates(this);

    this.currentState = this.states[sitting];
    this.currentState.enter();
  }

  onGround() {
    return this.positionY >= this.groundLevel;
  }

  update() {
    this.currentState.handleInput(this.game.keyboardHandler.keys);
    this.collisions = this.getCollisions();

    // horizontal movement
    this.positionX += this.speedX;
    if (this.positionX - this.width / 2 < 0) this.positionX = this.width / 2;
    if (this.positionX > this.game.canvas.width - this.width / 2)
      this.positionX = this.game.canvas.width - this.width / 2;

    // vertical movement
    this.positionY += this.jumpSpeed;

    if (!this.onGround()) {
      this.jumpSpeed += this.weight;
    } else {
      this.positionY = this.groundLevel;
      this.jumpSpeed = 0;
    }

    const {frameNrX} = this.stateAnim[this.state];

    this.frameX =
      Math.floor(this.game.gameFrame / this.game.staggerFrames) % frameNrX;
  }
}

export default Player;
