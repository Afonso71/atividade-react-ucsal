import React, { useState } from 'react';

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tabs-header" role="tablist">
        {tabs.map((tab, index) => {
          const isSelected = activeTab === index;
          return (
            <button
              key={tab.id || index}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`tab-panel-${index}`}
              id={`tab-btn-${index}`}
              className={`tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      <div
        id={`tab-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-btn-${activeTab}`}
        className="tab-panel"
      >
        <h3>{tabs[activeTab].title}</h3>
        <p>{tabs[activeTab].content}</p>
      </div>
    </div>
  );
}