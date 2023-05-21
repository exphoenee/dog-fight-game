import Running from "./PlayerStates/Running";
import Sitting from "./PlayerStates/Sitting";
import Jumping from "./PlayerStates/Jumping";
import Falling from "./PlayerStates/Falling";
import Rolling from "./PlayerStates/Rolling";
import Diving from "./PlayerStates/Diving";
import Dizzy from "./PlayerStates/Dizzy";

const getPlayerStates = (player) =>
  [Sitting, Running, Jumping, Falling, Rolling, Diving, Dizzy]
    .map((State) => new State(player))
    .reduce((acc, State) => {
      acc[State.name] = State;
      return acc;
    }, {});

export default getPlayerStates;
