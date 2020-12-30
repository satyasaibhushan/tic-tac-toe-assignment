import { useState, useReducer } from "react";
import Square from "./Square";
import checkWinner from "../checkWinner";
import {X,O} from "../assets/svgs" 
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
      document.getElementsByClassName("square")[i].innerHTML = state.isX ? X : O;
    }

    // console.log("clicked square" + i ,values);
  };

  let renderSquare = i => <Square key={i} index={i} value={state.values[i]} onClick={() => clickedSquare(i)} />;

  return (
    <div>
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
    </div>
  );
};

export default Game;
