import { useEffect, useRef } from "react";
import { X, O } from "../../assets/svgs";
import "./square.css"

const Square = props => {
  const inputEl = useRef(null);
  useEffect(() => {
    if (props.value) props.validate(props.index);
    inputEl.current.innerHTML = props.value == "X" ? X : props.value == "O" ? O : "";
  }, [props.value]);

  return (
    <td ref={inputEl} className={props.value ? `square ${props.value}` : "square "} onClick={props.onClick}>
      {/* {props.value} */}
    </td>
  );
};

export default Square;
