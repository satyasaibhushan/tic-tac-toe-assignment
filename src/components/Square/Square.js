import { useEffect, useRef } from "react";
import { X, O } from "../../assets/svgs";
import "./square.css";

const Square = props => {
  const inputEl = useRef(null);
  useEffect(() => {
    if (props.value) props.validate(props.index);
    inputEl.current.innerHTML = props.value == "X" ? X : props.value == "O" ? O : "";
  }, [props.value]);

  useEffect(() => {
    if (props.highlight) {
      inputEl.current.className = inputEl.current.className + " animation";
      setTimeout(() => {
        var lastIndex = inputEl.current.className.lastIndexOf(" ");
        inputEl.current.className = inputEl.current.className.substring(0, lastIndex);
      }, 1000);
    }
  }, [props.highlight]);

  return (
    <td ref={inputEl} className={props.value ? `square ${props.value}` : "square "} onClick={props.onClick}>
      {/* {props.value} */}
    </td>
  );
};

export default Square;
