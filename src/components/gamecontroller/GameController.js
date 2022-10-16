import "./GameController.css";

import { Action, actionForKey, actionIsDrop } from "../../businesss/Input";
import { playerController } from "../../businesss/PlayerController";

import { useInterval } from "../../hooks/useInterval";
import { useDropTime } from "../../hooks/useDropTime";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats,
  });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) {
      resumeDropTime();
    }
    // console.log(`onKeyUp ${code}`);
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);

    //pause unpause
    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setGameOver(true);
      // console.log(`onKeyUp ${code}`);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      if (!dropTime) {
        return;
      }
      handleInput({ action });
      console.log(`onKeyDown ${code}`);
    }
  };

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

  return (
    <input
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

//

export default GameController;
