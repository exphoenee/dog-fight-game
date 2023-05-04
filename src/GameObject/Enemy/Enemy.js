import GameObject from "../GameObject";
import allEnemyPropertiesRaw from "./enemyProperties";
import {nrBetween} from "../../utils/nrBetween";

class Enemy extends GameObject {
  constructor(game, optionalProperties) {
    const type =
      optionalProperties.type ??
      Math.floor(Math.random() * allEnemyPropertiesRaw.length);
    const enemyProperties = allEnemyPropertiesRaw.at(type);

    super(game, {...enemyProperties, ...optionalProperties, type});
    this.sizeMin = 0.8;
    this.sizeMax = 1.2;
    // this.sizeFactor = nrBetween(this.sizeMin, this.sizeMax);

    this.postitionXOriginal = this.positionX;
    this.postitionYOriginal = this.positionY;

    this.twitchingRadius = 10;
    this.twitchingStagger = 4;

    this.swayingSpeedX = nrBetween(3, 6);
    this.swayingAngle = nrBetween(0, 2);
    this.swayingAmplidude = nrBetween(3, 6);

    this.swirlingAngle = 0;
    this.swirlingAngleSpeed = nrBetween(1.5, 2);
    this.swirlingCurve = nrBetween(0.3, 0.6);
    this.swirlingAmplidude = nrBetween(100, 200);
    this.swirlingPeriodX = nrBetween(80, 100);
    this.swirlingPeriodY = nrBetween(200, 500);

    this.topMargin = 60;
    this.bottomMargin = 60;
    this.leftMargin = 60;
    this.rightMargin = 60;
    this.positionXTarget = this.newTargetPosX;
    this.positionYTarget = this.newTargetPosY;
    this.moveSpeedMin = 40;
    this.moveSpeedMax = 60;
    this.movingSpeed = this.newMoveSpeed;
    this.sizeTarget = this.newSizeTarget;
    this.changeSize = true;

    this.movingForwardSpeed = 1;
    this.movingForwardMinY =
      this.game.canvasHandler.height - this.height / 2 - 100;
    this.movingForwardMaxY =
      this.game.canvasHandler.height - this.height / 2 - 20;

    this.upAndDownMaxSpeed = 1.4;
    this.upAndDownMinSpeed = 0.7;
    this.upAndDownSpeed = nrBetween(
      this.upAndDownMinSpeed,
      this.upAndDownMaxSpeed
    );
    this.upAndDownMaxY = this.game.canvasHandler.height / 2 + this.height / 2;
    this.upAndDownMinY = this.height;
    this.upAndDownDirection = "down";
  }

  get newTargetPosX() {
    return nrBetween(
      this.leftMargin,
      this.game.canvas.width - this.rightMargin
    );
  }

  get newTargetPosY() {
    return nrBetween(
      this.bottomMargin,
      this.game.canvas.width - this.leftMargin
    );
  }

  get newMoveSpeed() {
    return nrBetween(this.moveSpeedMin, this.moveSpeedMax, true);
  }

  get newSizeTarget() {
    return nrBetween(this.sizeMin, this.sizeMax);
  }

  twitching() {
    if (this.game.gameFrame % this.twitchingStagger === 0) {
      this.positionX +=
        this.twitchingRadius / 2 - nrBetween(0, this.twitchingRadius);
      this.positionY +=
        this.twitchingRadius / 2 - nrBetween(0, this.twitchingRadius);
    }
  }

  swaying() {
    this.positionX -= this.swayingSpeedX;
    this.positionY += Math.sin(this.swayingAngle) * this.swayingAmplidude;
    this.swayingAngle += 0.1;
  }

  swirling() {
    this.positionX =
      this.postitionXOriginal +
      this.swirlingAmplidude *
        Math.sin((this.swirlingAngle * Math.PI) / this.swirlingPeriodX);
    this.positionY =
      this.postitionYOriginal +
      this.swirlingAmplidude *
        Math.sin((this.swirlingAngle * Math.PI) / this.swirlingPeriodY);

    this.swirlingAngle += this.swirlingAngleSpeed;
  }

  moving() {
    if (this.game.gameFrame % this.movingSpeed === 0) {
      this.positionXTarget = this.newTargetPosX;
      this.positionYTarget = this.newTargetPosY;
      this.sizeTarget = this.newSizeTarget;
      this.movingSpeed = this.newMoveSpeed;
    }
    const dx = this.positionX - this.positionXTarget;
    const dy = this.positionY - this.positionYTarget;
    const dSize = this.sizeFactor - this.sizeTarget;

    if (this.changeSize) this.setSize(this.sizeFactor - dSize / this.movingSpeed);
    this.positionX -= dx / this.movingSpeed;
    this.positionY -= dy / this.movingSpeed;
  }

  movingForward() {
    if (
      this.positionY < this.movingForwardMinY ||
      this.positionY > this.movingForwardMaxY
    ) {
      this.positionY = nrBetween(
        this.movingForwardMaxY,
        this.movingForwardMinY
      );
    }
    this.positionX -= this.movingForwardSpeed;
  }

  upAndDown() {
    if (this.upAndDownDirection === "up") this.positionY -= this.upAndDownSpeed;
    if (this.upAndDownDirection === "down")
      this.positionY += this.upAndDownSpeed;
    if (this.positionY > this.upAndDownMaxY) {
      this.upAndDownDirection = "up";
      this.positionY = this.upAndDownMaxY;
      this.upAndDownSpeed = nrBetween(
        this.upAndDownMinSpeed,
        this.upAndDownMaxSpeed
      );
    } else if (this.positionY < this.upAndDownMinY) {
      this.upAndDownDirection = "down";
      this.positionY = this.upAndDownMinY;
      this.upAndDownSpeed = nrBetween(
        this.upAndDownMinSpeed,
        this.upAndDownMaxSpeed
      );
    }
    this.game.canvasHandler.drawLine(
      this.positionX,
      this.positionY,
      this.positionX,
      0,
      "black",
      2
    );
  }

  update() {
    const {frameNrX, frameY} = this.stateAnim[this.state];
    this.frameY = frameY;
    this.frameX =
      Math.floor(this.game.gameFrame / this.game.staggerFrames) % frameNrX;

    if (this.positionX < -this.width) {
      this.positionX = this.game.canvas.width;
      this.positionY = Math.random() * this.game.canvas.height;
    }

    if (this.type === 0) this.twitching();
    if (this.type === 1) this.swaying();
    if (this.type === 2) this.swirling();
    if (this.type === 3) this.moving();
    if (this.type === 4) this.movingForward();
    if (this.type === 5) this.upAndDown();
  }
}

export default Enemy;
