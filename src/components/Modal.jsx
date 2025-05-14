import { createPortal } from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  if (!show) return null;
  return createPortal(
    <div className="modal-container">
      <div className="modal">
        <h2>{title}</h2>
        {content}
        <button onClick={onClose}>Chiudi</button>
        <button onClick={onConfirm}>{confirmText}</button>
      </div>
    </div>,
    document.body
  );
}
