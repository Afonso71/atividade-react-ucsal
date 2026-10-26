import React from 'react';

export default function ProgressBar({ progress, label, unitCode }) {
  const safeVal = Math.min(100, Math.max(0, progress));

  return (
    <div className="rpm-meter">
      <div className="rpm-header">
        <span className="rpm-code">{unitCode}</span>
        <span className="rpm-label">{label}</span>
        <span className="rpm-val">{safeVal}%</span>
      </div>
      <div
        className="rpm-track"
        role="progressbar"
        aria-valuenow={safeVal}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={label}
      >
        <div className="rpm-fill" style={{ width: `${safeVal}%` }} />
      </div>
    </div>
  );
}