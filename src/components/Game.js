import { useState } from "react";
import Square from "./Square";
import  checkWinner  from "../checkWinner";
let n = 3;

const Game = () => {
  console.log("rerendering");
  const [values, setValues] = useState(Array(n*n).fill(null));
  const [isPlayerX, setPlayer] = useState(true);
  // console.log(values)

  let clickedSquare = (i) => {
    if(! values[i]){

      let presentValues = values.slice();
      presentValues[i] =  isPlayerX? "X":"O";
console.log(presentValues);
      setValues(presentValues);
      setPlayer(!isPlayerX);
      if(checkWinner(presentValues,n,i,isPlayerX)) alert(`Winner is ${isPlayerX? "X":"O"}`)
      console.log("setting")
    }
    console.log("clicked square" + i ,values);
  };

  let renderSquare = (i) => <Square value={values[i]} onClick={() => clickedSquare(i)} />;

  return (
    <div>
      <div>Next Player is: {isPlayerX? "X":"O"}</div>
      {[...Array(n)].map((row, i) => {
        return (
          <div key={i} className="board-row">
            {[...Array(n)].map((value, j) => {
              return <span key={(i + 100) * n + j}>{renderSquare(i*n+j)}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Game;
