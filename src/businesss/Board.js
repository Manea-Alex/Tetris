import { defaultCell } from "./Cell.js";
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

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;

  //copy and clear spaces used by pieces that hadnt collided and occupied space permanently

  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  rows = transferToBoard({
    className: tetromino.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: tetromino.shape,
  });

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
