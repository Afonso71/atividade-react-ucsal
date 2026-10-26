import React, { useState } from 'react';

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="setup-tabs">
      <div className="tabs-bar" role="tablist">
        {tabs.map((tab, index) => {
          const isSelected = activeTab === index;
          return (
            <button
              key={tab.id || index}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`setup-panel-${index}`}
              id={`setup-tab-${index}`}
              className={`tab-switch ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="tab-prefix">0{index + 1} //</span> {tab.title}
            </button>
          );
        })}
      </div>

      <div
        id={`setup-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`setup-tab-${activeTab}`}
        className="tab-content-box"
      >
        <div className="tab-spec-code">SISTEMA: {tabs[activeTab].specCode}</div>
        <h3>{tabs[activeTab].title}</h3>
        <p>{tabs[activeTab].content}</p>
      </div>
    </div>
  );
}