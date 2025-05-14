import { createPortal } from "react-dom";

export default function Modal({
  title = "Titolo della modale",
  content = "Contenuto della modale",
  show = false,
  onClose = () => {},
  onConfirm = () => {},
  confirmText = "testo del bottone di conferma",
}) {
  return (
    show &&
    createPortal(
      <div className="modal-container">
        <div className="modal">
          <h2>{title}</h2>
          <p>{content}</p>
          <button onClick={onClose}>Chiudi</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>,
      document.body
    )
  );
}
