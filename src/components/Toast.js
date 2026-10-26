import React, { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const codeLabels = {
    success: 'OBD // OK',
    error: 'OBD // FALHA',
    info: 'OBD // LEITURA',
  };

  return (
    <div className={`toast-unit toast-${type}`} role="alert">
      <div className="toast-body">
        <span className="toast-tag">[{codeLabels[type]}]</span>
        <span className="toast-msg">{message}</span>
      </div>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Fechar alerta de telemetria"
      >
        LIMPAR [X]
      </button>
    </div>
  );
}