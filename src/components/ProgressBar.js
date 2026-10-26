import React from 'react';

export default function ProgressBar({ progress, label }) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-percentage">{safeProgress}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={safeProgress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={label}
      >
        <div
          className="progress-fill"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}