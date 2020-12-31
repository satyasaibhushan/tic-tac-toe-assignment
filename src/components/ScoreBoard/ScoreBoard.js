import "./scoreBoard.css";
import {useEffect} from "react"

const ScoreBoard = (props) => {
  return (
    <div className="scoreBoard" style={{boxShadow:props.isHighlight?props.player=="X"?"-1px 2px 5px 0px #49a1ea":"-1px 2px 5px 0px #ff5e13":""}}>
      <p className="scoreBoardPlayer">{props.player=="X"?"X":props.player=="O"?"O":""}</p>
      <p className="scoreBoardCount">{props.count==0?"-":props.count}</p>
    </div>
  );
};

export default ScoreBoard;
