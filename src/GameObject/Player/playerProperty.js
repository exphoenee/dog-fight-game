import {sitting} from "./PlayerStates/Sitting";
import {jumping} from "./PlayerStates/Jumping";
import {falling} from "./PlayerStates/Falling";
import {running} from "./PlayerStates/Running";
import {rolling} from "./PlayerStates/Rolling";
import {diving} from "./PlayerStates/Diving";
import {dizzy} from "./PlayerStates/Dizzy";
// import idle from "./PlayerStates/Idle";
// import {biting} from "./PlayerStates/Biting";
// import {ko} from "./PlayerStates/KO";
// import {getHit} from "./PlayerStates/GetHit";

const playerProperty = {
  imageName: "shadow_dog",
  name: "player",
  spriteWidthRaw: 6876 / 12 + 2,
  spriteHeightRaw: 5230 / 10,
  jumpHeight: 30,
  weight: 1,
  dizzyTime: 1000,
  width: 128,
  speedX: 0,
  maxSpeedX: 5,
  speedY: 5,
  zIndex: 1,
  stateAnim: {
    [sitting]: {frameY: 5, frameNrX: 5},
    [running]: {frameY: 3, frameNrX: 8},
    [jumping]: {frameY: 1, frameNrX: 6},
    [falling]: {frameY: 2, frameNrX: 6},
    [rolling]: {frameY: 6, frameNrX: 7},
    [diving]: {frameY: 6, frameNrX: 7},
    [dizzy]: {frameY: 4, frameNrX: 11},
    // [biting]: {frameY: 7, frameNrX: 7},
    // [ko]: {frameY: 8, frameNrX: 12},
    // [getHit]: {frameY: 9, frameNrX: 4},
    // [idle]: {frameY: 0, frameNrX: 6},
  },
};

export default playerProperty;
