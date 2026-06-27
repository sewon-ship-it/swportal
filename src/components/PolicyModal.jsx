import React, { useEffect } from 'react';
import './PolicyModal.css';

const PolicyModal = ({ isOpen, onClose, title, content }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {/* Use simple line break parsing for markdown-like text */}
          {content.split('\n').map((line, index) => {
            if (line.startsWith('## ')) {
              return <h3 key={index}>{line.replace('## ', '')}</h3>;
            } else if (line.startsWith('# ')) {
              return <h2 key={index}>{line.replace('# ', '')}</h2>;
            } else if (line.trim() === '') {
              return <br key={index} />;
            }
            return <p key={index}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
