import { useState, useRef } from "react";
import Board from "../Board/Board.js";
import ScoreBoard from "../ScoreBoard/ScoreBoard.js";
import "./game.css";
import { ReactComponent as Logo } from "../../assets/delete.svg";

const Game = () => {
  const [wins, setWins] = useState({ X: 0, O: 0 });
  const [currentPlayer, setCurrentPlayer] = useState("X");

  return (
    <div className="Game">
      <Board
        wonGame={winner => {
          setTimeout(() => {
            winner == "X" ? setWins({ ...wins, X: ++wins.X }) : setWins({ ...wins, O: ++wins.O });
          }, 500);
        }}
        changePlayer={player => setCurrentPlayer(player)}
      />
      <div className="ScroeBoardsContainer">
        <ScoreBoard player="X" count={wins.X} isHighlight={currentPlayer == "X"} />
        <ScoreBoard player="O" count={wins.O} isHighlight={currentPlayer == "O"} />
        <div className="scoresResetDiv" data-tooltip="clear scores" onClick={() => setWins({ X: 0, O: 0 })}>
          <Logo width="30px" height="30px" />
        </div>
      </div>
    </div>
  );
};

export default Game;
