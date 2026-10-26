import React, { useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="torque-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const stepNum = String(index + 1).padStart(2, '0');

        return (
          <div key={item.id || index} className={`acc-item ${isOpen ? 'is-expanded' : ''}`}>
            <button
              type="button"
              className="acc-header"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={`acc-content-${index}`}
              id={`acc-trigger-${index}`}
            >
              <span className="acc-step">{stepNum}</span>
              <span className="acc-title">{item.title}</span>
              <span className="acc-state">{isOpen ? '[FECHAR -]' : '[ABRIR +]'}</span>
            </button>

            <div
              id={`acc-content-${index}`}
              role="region"
              aria-labelledby={`acc-trigger-${index}`}
              className="acc-panel"
            >
              <div className="acc-panel-inner">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}