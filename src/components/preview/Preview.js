import React from "react";
import "./Preview.css";

import { buildBoard } from "../../businesss/Board";
import { transferToBoard } from "../../businesss/Tetrominoes";

import BoardCell from "../boardcell/BoardCell.js";

//the pieces that show up next and are going to be transfered to the board 4 by 4
const Preview = ({ tetromino, index }) => {
  const { shape, className } = tetromino;
  // console.log("tetromino is ", tetromino);
  // console.log("Class Name is ", tetromino);
  // console.log("Shape is ", shape);

  const board = buildBoard({ rows: 4, columns: 4 });
  const style = { top: `${index * 15}vw` };

  // console.log("Board is ", board);
  //transfer the tetramino to the board
  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape,
  });

  // console.log("Board rows ", board.rows);

  //rendering the preview
  //actual board getting rendered line 30
  return (
    <div className="Preview" style={style}>
      <div className="Preview-board">
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Preview);
