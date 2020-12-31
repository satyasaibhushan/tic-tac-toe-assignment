import { useState, useReducer, useEffect } from "react";
import Square from "../Square/Square";
import checkWinner from "../../checkWinner";
import Modal from "../Modal/Modal";
import "./game.css";

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
      console.log(moves, "moves");
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

const Game = () => {
  console.log("rerendering");
  const [state, dispatch] = useReducer(reducer, initialState(true));

  let clickedSquare = i => {
    if (!state.values[i] && !state.isGameOver) {
      state.values[i] = state.isX ? "X" : "O";
      dispatch({ values: state.values, type: "clickedSquare" });
    }
    // console.log("clicked square" + i ,values);
  };

  let validate = i => {
    let isWon = checkWinner(state.values, n, i, !state.isX);
    if (isWon) {
      setTimeout(() => {
        dispatch({ type: "won", winner: !state.isX ? "X" : "O" });
      }, 500);
    } else if (moves == n * n) {
      setTimeout(() => {
        dispatch({ type: "draw" });
      }, 500);
    }
  };

  let renderSquare = i => (
    <Square key={i} index={i} value={state.values[i]} onClick={() => clickedSquare(i)} validate={validate} />
  );
  let restartGame = winner => {
    dispatch({ type: "restart game" });
  };
  return (
    <div>
      <Modal
        isModalOpen={state.isModalOpen}
        text1={state.winner === "" ? "Draw!!" : "And the winner is!"}
        winner={state.winner}
        buttonText={"Restart Game"}
        clickedRestart={() => dispatch({ type: "restart game" })}
        closeModal={() => dispatch({ type: "closeModal" })}
      />
      <div>Next Player is: {state.isX ? "X" : "O"}</div>
      <table className="gameContainer">
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
        <button>Restart Game</button>
      </div>
    </div>
  );
};

export default Game;
