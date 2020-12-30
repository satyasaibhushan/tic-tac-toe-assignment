import { useState, useReducer } from "react";
import Square from "./Square";
import checkWinner from "../checkWinner";

let n = 3;
const initialState = isX => ({ values: Array(n * n).fill(null), isX });

let reducer = (state, action) => {
  switch (action.type) {
    case "clickedSquare":
      return { values: action.values, isX: !state.isX };
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
      if (checkWinner(state.values, n, i, state.isX)) alert(`Winner is ${state.isX ? "X" : "O"}`);
    }
    // console.log("clicked square" + i ,values);
  };

  let renderSquare = i => <Square value={state.values[i]} onClick={() => clickedSquare(i)} />;

  return (
    <div>
      <div>Next Player is: {state.isX ? "X" : "O"}</div>
      {[...Array(n)].map((row, i) => {
        return (
          <div key={i} className="board-row">
            {[...Array(n)].map((value, j) => {
              return <span key={(i + 100) * n + j}>{renderSquare(i * n + j)}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Game;
