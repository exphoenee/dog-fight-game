export const state = {
  sit: 0,
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
};

class State {
  constructor(state) {
    this.state = state;
  }

  enter() {
    throw new Error("enter method not implemented");
  }

  handleInput(input) {
    throw new Error("handleInput method not implemented");
  }
}

export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }

  enter() {
    this.player.frameY = 1;
  }

  handleInput(input) {
    if (input === "LEFT") {
      this.player.setState(this.player.states.WALKING_LEFT);
    }
  }
}