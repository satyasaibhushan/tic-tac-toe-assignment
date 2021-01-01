import { useState, useReducer } from "react";
import Board from "../Board/Board.js";
import ScoreBoard from "../ScoreBoard/ScoreBoard.js";
import "./game.css";
import { ReactComponent as Logo } from "../../assets/delete.svg";
import useCookie from "../../useCookie";

let initialState = { X: 0, O: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "O":
      action.update(`{ "X":${state.X}, "O": ${state.O + 1} }`);
      return { ...state, O: state.O + 1 };
    case "X":
      action.update(`{ "X":${state.X + 1}, "O": ${state.O} }`);
      return { ...state, X: state.X + 1 };
    case "reset":
      action.update(`{ "X":0, "O": 0 }`);
      return initialState;
    default:
      throw new Error();
  }
}

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [cookie, updateCookie] = useCookie("noOfWins", '{ "X": 0, "O": 0 }');
  const [state, dispatch] = useReducer(reducer, JSON.parse(cookie));
  // console.log(cookie, state, typeof(state) );

  return (
    <div className="Game">
      <Board
        wonGame={winner => {
          setTimeout(() => {
            winner == "X"
              ? dispatch({ type: "X", update: updateCookie })
              : dispatch({ type: "O", update: updateCookie });
          }, 500);
        }}
        changePlayer={player => setCurrentPlayer(player)}
      />
      <div className="ScroeBoardsContainer">
        <ScoreBoard player="X" count={state.X} isHighlight={currentPlayer == "X"} />
        <ScoreBoard player="O" count={state.O} isHighlight={currentPlayer == "O"} />
        <div
          className="scoresResetDiv"
          data-tooltip="clear scores"
          onClick={() => dispatch({ type: "reset", update: updateCookie })}>
          <Logo width="30px" height="30px" />
        </div>
      </div>
    </div>
  );
};

export default Game;
