const className = "tetromino";

export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    className: `${className}  ${className}__i`,
  },

  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    className: `${className}  ${className}__j`,
  },

  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    className: `${className}  ${className}__l`,
  },

  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    className: `${className}  ${className}__o`,
  },

  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    className: `${className}  ${className}__s`,
  },

  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    className: `${className}  ${className}__t`,
  },

  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    className: `${className}  ${className}__z`,
  },
};

//returns the random tetromino
export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return TETROMINOES[key];
};

export const transferToBoard = ({
  className,
  isOccupied,
  position,
  rows,
  shape,
}) => {
  //go through each cell look at each row for the shape and for each row look at each column
  //if it has a cell set the values
  //you know where to place the items in the board (15 16)
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const occupied = isOccupied;
        const _y = y + position.row;
        const _x = x + position.column;
        rows[_y][_x] = { occupied, className };
      }
    });
  });
  return rows;
};
