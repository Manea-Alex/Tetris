import { defaultCell } from "./Cell.js";

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
