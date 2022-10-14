import { useState } from "react";
import { buildBoard } from "../businesss/Board";

export const useBoard = ({ rows, columns }) => {
  const [board] = useState(buildBoard({ rows, columns }));

  return [board];
};
