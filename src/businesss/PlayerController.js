import { Action } from "./Input";
import { rotate } from "./Tetrominoes";
import { hasCollision, isWithinBoard } from "./Board";

const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  const position = player.position;
  //verify if we can perform the rotation
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  } else {
    return false;
  }
};

export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column,
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  //prevent going outside the board
  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0; //trying to move down the row(up in rows)
  const isHit = isMovingDown && (collided || !isOnBoard); // check if you run into smth

  return {
    collided: isHit,
    nextPosition,
  };
};

const attemptMovement = ({ board, action, player, setPlayer, setGameOver }) => {
  //delta computes how much we want to move
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;
  //   console.log("Action ", action);
  if (action === Action.FastDrop) {
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.column -= 1;
    console.log("Action ", action);
  } else if (action === Action.Right) {
    delta.column += 1;
    console.log("Action ", action);
  }

  //give current positon, how much we move, the current board and the shape
  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.tetromino.shape,
    board,
  });

  //if we collide game over
  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    console.log(
      "coliziune e ",
      collided,
      "player pos row e ",
      player.position.row
    );
    console.log("bubaa");
    setGameOver(isGameOver);
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver });
  }
};
