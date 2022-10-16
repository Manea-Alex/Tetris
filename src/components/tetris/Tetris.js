import "./Tetris.css";

import Board from "../board/Board";
import GameStats from "../gamestats/GameStats";
import Previews from "../previews/Previews";

import { useBoard } from "../../hooks/useBoard";
import { useGameStats } from "../../hooks/useGameStats";
import { usePlayer } from "../../hooks/usePlayer";

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

  console.log("Player tetro ", player.tetrominoes);
  return (
    <div className="Tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <div className="WRAP">
        <Previews tetrominoes={player.tetrominoes} />
      </div>
    </div>
  );
};

export default Tetris;
