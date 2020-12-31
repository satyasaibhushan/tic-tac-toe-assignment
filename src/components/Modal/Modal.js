import React from "react";
import "./modal.css";
const Modal = props => {
  const divStyle = {
    display: props.isModalOpen ? "block" : "none",
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }
  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
      </div>
    </div>
  );
};
export default Modal;
