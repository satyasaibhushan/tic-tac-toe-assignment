import { useState, useReducer, useEffect } from "react";
import Square from "../Square/Square";
import checkWinner from "../../checkWinner";
import Modal from "../Modal/Modal";
import "./board.css";
import { ReactComponent as RefreshIcon } from "../../assets/refreshIcon.svg";

let n = 3;
let moves = 0;
const initialState = isX => ({
  values: Array(n * n).fill(null),
  isX,
  isModalOpen: false,
  isGameOver: false,
  winner: "",
});

let reducer = (state, action) => {
  switch (action.type) {
    case "clickedSquare":
      moves++;
      return { ...state, values: action.values, isX: !state.isX };
    case "restart game":
      moves = 0;
      return initialState(true);
    case "won":
      return { ...state, isModalOpen: true, isGameOver: true, winner: action.winner };
    case "closeModal":
      return { ...state, isModalOpen: false };
    case "draw":
      return { ...state, isModalOpen: true, isGameOver: true, winner: "" };
    // case "game over":
    //   return { ...state, isGameOver: true };
    default:
      throw new Error();
  }
};

let elementsWon = [];
const Board = props => {
  // console.log("rerendering");
  const [state, dispatch] = useReducer(reducer, initialState(true));

  let clickedSquare = i => {
    if (!state.values[i] && !state.isGameOver) {
      props.changePlayer(!state.isX ? "X" : "O");
      state.values[i] = state.isX ? "X" : "O";
      dispatch({ values: state.values, type: "clickedSquare" });
    }
    // console.log("clicked square" + i ,values);
  };

  let validate = i => {
    let isWon;
    [isWon, elementsWon] = checkWinner(state.values, n, i, !state.isX);
    if (isWon) {
      console.log(elementsWon)
      props.wonGame(!state.isX ? "X" : "O");
      setTimeout(() => {
        dispatch({ type: "won", winner: !state.isX ? "X" : "O" });
      }, 1500);
    } else if (moves == n * n) {
      setTimeout(() => {
        dispatch({ type: "draw" });
      }, 500);
    }
  };

  let renderSquare = i => {
    return (
    <Square
      key={i}
      index={i}
      value={state.values[i]}
      onClick={() => clickedSquare(i)}
      validate={validate}
      highlight={elementsWon.indexOf(i) != -1}
    />
  );
  }
  let restartGame = winner => {
    dispatch({ type: "restart game" });
    props.changePlayer("X");
  };
  return (
    <div>
      <Modal
        isModalOpen={state.isModalOpen}
        text1={state.winner === "" ? "Draw!!" : "And the winner is!"}
        winner={state.winner}
        buttonText={"Restart Game"}
        clickedRestart={restartGame}
        closeModal={() => dispatch({ type: "closeModal" })}
      />
      <table className="boardContainer">
        <tbody>
          {[...Array(n)].map((row, i) => {
            return (
              <tr key={i} className="board-row">
                {[...Array(n)].map((value, j) => {
                  return renderSquare(i * n + j);
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="restartGameContainer" onClick={() => restartGame()}>
        <RefreshIcon className="refreshIcon" data-tooltip="refresh board"  />
      </div>
    </div>
  );
};

export default Board;
