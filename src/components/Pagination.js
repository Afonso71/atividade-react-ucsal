import React from 'react';

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="service-pagination" aria-label="Navegação de ordens de serviço">
      <button
        type="button"
        className="page-ctrl"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; ANTERIOR
      </button>

      <div className="page-numbers">
        {pages.map((page) => {
          const isCurrent = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              className={`page-num-btn ${isCurrent ? 'is-active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-current={isCurrent ? 'page' : undefined}
            >
              PÁG 0{page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="page-ctrl"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        PRÓXIMA &gt;
      </button>
    </nav>
  );
}