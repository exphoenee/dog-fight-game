import {
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

const playerProperty = {
  imageName: "shadow_dog",
  name: "player",
  spriteWidthRaw: 6876 / 12 + 2,
  spriteHeightRaw: 5230 / 10,
  width: 128,
  speedX: 5,
  speedY: 5,
  zIndex: 1,
  states: {
    [idle]: {frameY: 0, frameNrX: 6},
    [jump]: {frameY: 1, frameNrX: 6},
    [fall]: {frameY: 2, frameNrX: 6},
    [run]: {frameY: 3, frameNrX: 8},
    [dizzy]: {frameY: 4, frameNrX: 11},
    [sitting]: {frameY: 5, frameNrX: 5},
    [roll]: {frameY: 6, frameNrX: 7},
    [bite]: {frameY: 7, frameNrX: 7},
    [ko]: {frameY: 8, frameNrX: 12},
    [getHit]: {frameY: 9, frameNrX: 4},
  },
};

export default playerProperty;
