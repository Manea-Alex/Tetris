import { findAllByDisplayValue } from "@testing-library/react";
import { useState, useCallback } from "react";
import { randomTetromino } from "../businesss/Tetrominoes";

//info about the tetros
const buildPlayer = (previous) => {
  let tetrominoes;
  //an empty array of 0, for each element in the arraay we map through it and create
  //a random tetromino
  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map((_) => randomTetromino());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    //pop one the one we want to use, we have 4 previewable
    tetromino: tetrominoes.pop(),
  };
};

//export the hook that gets the player and setplayerstate
//reset player when we want to, taking the prev value of player and pass it to build
//thats gonna let us keep some values from the pre player and updte what we need to
export const usePlayer = () => {
  const [player, setPlayer] = useState(buildPlayer());

  const resetPlayer = useCallback(() => {
    setPlayer((prev) => buildPlayer(prev));
  }, []);

  return [player, setPlayer, resetPlayer];
};
