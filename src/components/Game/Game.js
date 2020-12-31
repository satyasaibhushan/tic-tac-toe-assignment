import { useState, useReducer, useEffect } from "react";
import Square from "../Square/Square";
import checkWinner from "../../checkWinner";
import Modal from "../Modal/Modal";

let n = 3;
const initialState = isX => ({ values: Array(n * n).fill(null), isX, isModalOpen: false });

let reducer = (state, action) => {
  switch (action.type) {
    case "clickedSquare":
      return { ...state, values: action.values, isX: !state.isX };
    case "restart game":
      return initialState(true);
    case "won":
      return { ...state, isModalOpen: true };
    case "closeModal":
      return { ...state, isModalOpen: false };
    default:
      throw new Error();
  }
};

const Game = () => {
  console.log("rerendering");
  const [state, dispatch] = useReducer(reducer, initialState(true));

  let clickedSquare = i => {
    if (!state.values[i]) {
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
      <Modal isModalOpen={state.isModalOpen} closeModal={()=>dispatch({ type: "closeModal" })} />
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
