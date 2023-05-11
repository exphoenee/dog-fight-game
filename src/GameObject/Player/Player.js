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
    this.weight = 1;

    this.setCanCollideWith(["enemy"]);

    this.states = getPlayerStates(this);

    this.currentState = this.states[sitting];
    this.currentState.enter();
  }

  get onGround() {
    return this.positionY >= this.groundLevel;
  }

  update() {
    this.currentState.handleInput(this.game.keyboardHandler.keys);

    this.collisions = this.getCollisions();

    const {frameNrX, frameY} = this.stateAnim[this.state];
    this.frameY = frameY;
    this.frameX =
      Math.floor(this.game.gameFrame / this.game.staggerFrames) % frameNrX;
  }
}

export default Player;
