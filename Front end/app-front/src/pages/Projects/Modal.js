import React from "react";
import "./project.css"; // Assume basic modal styles are defined here
import '@fortawesome/fontawesome-free/css/all.min.css';  

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}><i class="fa-sharp fa-solid fa-circle-xmark"></i></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
