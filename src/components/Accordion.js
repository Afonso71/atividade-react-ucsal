import React, { useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.id || index} className="accordion-item">
            <button
              type="button"
              className={`accordion-header ${isOpen ? 'active' : ''}`}
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-btn-${index}`}
            >
              <span>{item.title}</span>
              <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-btn-${index}`}
              className={`accordion-body ${isOpen ? 'open' : ''}`}
            >
              <div className="accordion-content">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}