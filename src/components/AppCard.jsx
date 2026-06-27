import React from 'react';
import './AppCard.css';

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case '초급': return 'var(--diff-easy)';
    case '중급': return 'var(--diff-medium)';
    case '고급': return 'var(--diff-hard)';
    default: return 'var(--text-secondary)';
  }
};

const AppCard = ({ app }) => {
  return (
    <div className="app-card">
      <div className="app-card-header">
        <h3>{app.title}</h3>
        <span className="app-objective">{app.objective}</span>
      </div>
      <div className="app-card-body">
        <div className="app-meta">
          <div className="meta-item">
            <span className="meta-label">난이도</span>
            <span className="meta-value" style={{ color: getDifficultyColor(app.difficulty), fontWeight: 600 }}>
              {app.difficulty}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">소요 시간</span>
            <span className="meta-value">{app.time}</span>
          </div>
        </div>
      </div>
      <div className="app-card-footer">
        <a href={app.url} className="launch-btn" target="_blank" rel="noreferrer">
          실행하기
        </a>
      </div>
    </div>
  );
};

export default AppCard;
