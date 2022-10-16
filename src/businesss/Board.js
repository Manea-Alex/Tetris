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

export const nextBoard = ({ board, player, restePlayer, addLinesCleared }) => {
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

  return {
    rows,
    size: { ...board.size },
  };
};
