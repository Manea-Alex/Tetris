import "./GameController.css";

import { Action, actionForKey } from "../../businesss/Input";
import { playerController } from "../../businesss/PlayerController";

import { useInterval } from "../../hooks/useInterval";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (action === Action.Quit) {
      setGameOver(true);
    }
    // console.log(`onKeyUp ${code}`);
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);
    handleInput({ action });
    console.log(`onKeyDown ${code}`);
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
