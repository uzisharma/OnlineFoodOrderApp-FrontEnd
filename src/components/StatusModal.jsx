import "./style/Modal.css";

export default function StatusModal({ title, setIsOpen, message }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={handleClose}>
            ✖
          </button>
        </header>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <button className="btn-close" onClick={handleClose}>
          OK
        </button>
      </div>
    </div>
  );
}
