import React from "react";
import Menu from "./Menu";

const start = () => {
  console.log("start");
};
const Game = () => {
  return (
    <div className="Game">
      <Menu onClick={start} />
    </div>
  );
};

export default Game;
