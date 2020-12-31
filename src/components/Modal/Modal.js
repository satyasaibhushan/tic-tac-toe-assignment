import React, { useRef, useEffect } from "react";
import "./modal.css";
import { X, O } from "../../assets/svgs";

const Modal = props => {
  const winner = useRef(null);
  const divStyle = {
    display: props.isModalOpen ? "block" : "none",
  };
  function closeModal(e) {
    e?e.stopPropagation():"";
    props.closeModal();
  }

  useEffect(() => {
    winner.current.innerHTML = props.winner == "X" ? X : props.winner == "O" ? O : "";
  }, [props.winner]);

  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      <div className="modal-content" style={{height:props.winner?"30%":"23%"}}onClick={e => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p style={{fontSize:props.winner?"27px":"42px"}}>{props.text1}</p>
        <div ref={winner} className="winner"></div>
        <div className="restartGameContainerModal" onClick={props.clickedButton}>
          <button
            onClick={() => {
              closeModal();
              props.clickedRestart();
            }}>
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
