import GameOver from "./GameStates/GameOver";
import Playing from "./GameStates/Playing";
import Pause from "./GameStates/Pause";
import Loading from "./GameStates/Loading";
import WaitingStart from "./GameStates/WaitingStart";

const getGameStates = (Game) =>
  [GameOver, Playing, Pause, Loading, WaitingStart]
    .map((State) => new State(Game))
    .reduce((acc, State) => {
      acc[State.name] = State;
      return acc;
    }, {});

export default getGameStates;
