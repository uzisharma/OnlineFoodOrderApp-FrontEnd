import React from "react";
import "./style/StatusModal.css";

export default function StatusModal({ isOpen, onClose, type, message }) {
  if (!isOpen) return null;

  return (
    <div className="status-modal-overlay">
      <div className={`status-modal-content ${type}`}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
