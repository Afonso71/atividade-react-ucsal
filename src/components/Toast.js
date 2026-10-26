import React, { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const typeLabels = {
    success: 'Sucesso',
    error: 'Erro',
    info: 'Informação',
  };

  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-content">
        <strong>{typeLabels[type]}: </strong>
        <span>{message}</span>
      </div>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}