import React from "react";
import "./style/StatusModal.css";

export default function StatusModal({ isOpen, onClose, type, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type}`}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
