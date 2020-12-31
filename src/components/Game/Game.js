import { useState, useRef } from "react";
import Board from "../Board/Board.js";
import ScoreBoard from "../ScoreBoard/ScoreBoard.js";
import "./game.css";

const Game = () => {
  const [wins, setWins] = useState({ X: 0, O: 0 });
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const playerRef = useRef("X");

  return (
    <div className="Game">
      <Board
        wonGame={winner => {
          winner == "X" ? setWins({ ...wins, X: ++wins.X }) : setWins({ ...wins, O: ++wins.O });
        }}
        changePlayer={player => setCurrentPlayer(player)}
      />
      <div className="ScroeBoardsContainer">
        <ScoreBoard player="X" count={wins.X} isHighlight={currentPlayer == "X"} />
        <ScoreBoard player="O" count={wins.O} isHighlight={currentPlayer == "O"} />
      </div>
    </div>
  );
};

export default Game;
