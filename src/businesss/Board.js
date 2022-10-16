import { defaultCell } from "./Cell.js";
import { movePlayer } from "./PlayerController";
import { transferToBoard } from "./Tetrominoes.js";

export const buildBoard = ({ rows, columns }) => {
  //take the rows and columns, make an array for the rows
  //for each row we make an array that represents the columns
  //in each column we set up a default cell
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );
  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

const findDropPosition = ({ board, position, shape }) => {
  //total numbers of rows for the board - the curr pos
  let max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;

  //copy and clear spaces used by pieces that hadnt collided and occupied space permanently

  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  //drop position
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape,
  });

  //Place the ghost
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "ghost"
  }`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: tetromino.shape,
  });

  //Place the piece, if its collided mark the board cells as collided
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: tetromino.shape,
    });
  }

  //check for cleared lines, generates new row
  const blankRow = rows[0].map((_) => ({ ...defaultCell }));
  let linesCleared = 0;
  //take our rows and reduce them, for the row
  //we say does every column in that row is occupied
  //if it is its a clear line, then we add a blank row to
  //the beginning of our rows
  rows = rows.reduce((acc, row) => {
    if (row.every((column) => column.occupied)) {
      linesCleared++;
      acc.unshift([...blankRow]);
    } else {
      acc.push(row);
    }
    return acc;
  }, []);

  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }

  //if we collided, reset the player
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }
  //return next board
  return {
    rows,
    size: { ...board.size },
  };
};

export const hasCollision = ({ board, position, shape }) => {
  //go through each row
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    //go through each column
    for (let x = 0; x < shape[y].length; x++)
      //check for the given row and column if there s a piece at that pos
      if (shape[y][x]) {
        const column = x + position.column;
        //check if we row and column and its occupied
        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
  }
  return false;
};

export const isWithinBoard = ({ board, position, shape }) => {
  //go through each row
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    //go through each column
    for (let x = 0; x < shape[y].length; x++)
      //check for the given row and column if there s a piece at that pos
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) return false;
      }
  }
  return true;
};
