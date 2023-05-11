import Running from "./PlayerStates/Running";
import Sitting from "./PlayerStates/Sitting";
import Jumping from "./PlayerStates/Jumping";
import Falling from "./PlayerStates/Falling";

const getPlayerStates = (player) =>
  [Sitting, Running, Jumping, Falling]
    .map((State) => new State(player))
    .reduce((acc, State) => {
      acc[State.name] = State;
      return acc;
    }, {});

export default getPlayerStates;
