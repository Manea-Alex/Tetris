import "./Tetris.css";

import Board from "../board/Board";
import GameStats from "../gamestats/GameStats";
import Previews from "../previews/Previews";
import GameController from "../gamecontroller/GameController";

import { useBoard } from "../../hooks/useBoard";
import { useGameStats } from "../../hooks/useGameStats";
import { usePlayer } from "../../hooks/usePlayer";
import Instructions from "../instructions/Instructions";

const Tetris = ({ rows, columns, setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats();

  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });
  let viewportHeight = window.innerHeight;
  let viewportWidth = window.innerWidth;

  console.log(viewportHeight, viewportWidth);
  // console.log("Player tetro ", player.tetrominoes);
  return (
    <>
      <div className="Tetris">
        <div className="Joc">
          <Board board={board} />

          <GameStats gameStats={gameStats} />
          <div className="WRAP">
            <Previews tetrominoes={player.tetrominoes} />
          </div>
          <Instructions />
        </div>
        <GameController
          board={board}
          gameStats={gameStats}
          player={player}
          setGameOver={setGameOver}
          setPlayer={setPlayer}
        />
      </div>
    </>
  );
};

export default Tetris;
