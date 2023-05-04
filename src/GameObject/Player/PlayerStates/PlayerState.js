export const state = {
  sit: 0,
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super("STANDING_LEFT");
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

export class StandingRight extends State {
  constructor(player) {
    super("STANDING_RIGHT");
    this.player = player;
  }

  enter() {}

  handleInput(input) {}
}
