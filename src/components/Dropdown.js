import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(label);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelectOption = (option) => {
    setSelectedText(option.label);
    setIsOpen(false);
    if (option.onClick) {
      option.onClick(option);
    }
  };

  return (
    <div className="ecu-dropdown" ref={menuRef}>
      <button
        type="button"
        className={`ecu-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="ecu-tag">SCANNER:</span>
        <span className="ecu-selected">{selectedText}</span>
        <span className="ecu-arrow">{isOpen ? '[-]' : '[+]'}</span>
      </button>

      {isOpen && (
        <ul className="ecu-list" role="menu">
          {options.map((option, index) => (
            <li key={option.value || index} role="none">
              <button
                type="button"
                role="menuitem"
                className="ecu-option"
                onClick={() => handleSelectOption(option)}
              >
                <span>{option.label}</span>
                <span className="ecu-opt-code">{option.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}