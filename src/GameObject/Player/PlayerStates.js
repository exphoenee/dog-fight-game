import playerProperty from "./playerProperty";

export const sitting = "sitting";
export const idle = "idle";
export const jump = "jump";
export const fall = "fall";
export const run = "run";
export const dizzy = "dizzy";
export const roll = "roll";
export const bite = "bite";
export const ko = "ko";
export const getHit = "getHit";

export const state = {
  sitting: 0,
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
};

class State {
  constructor(state, player) {
    this.name = state;
    this.player = player;
  }

  enter() {
    throw new Error("enter method not implemented");
  }

  handleInput(input) {
    throw new Error("handleInput method not implemented");
  }
}

class Sitting extends State {
  constructor(player) {
    super("sitting", player);
    console.log(this.name);
  }

  enter() {
    this.player.frameY = playerProperty.states[this.name].frameY;
  }

  handleInput(input) {
    if (input === "LEFT") {
      this.player.setState(this.player.states.WALKING_LEFT);
    }
  }
}

const playerStates = (player) => [new Sitting(player)].reduce((acc, state) => {
  acc[state.name] = state;
  return acc;
}, {});

export default playerStates;
