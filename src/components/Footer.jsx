import React from 'react';
import './Footer.css';

const Footer = ({ onOpenPolicy, onOpenTerms }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <button className="footer-link-btn" onClick={onOpenPolicy}>개인정보 처리방침</button>
            <span className="divider">|</span>
            <button className="footer-link-btn" onClick={onOpenTerms}>이용약관</button>
          </div>
          <div className="footer-info">
            <span>정보관리책임자: 박세원</span>
            <span className="divider">|</span>
            <span>Copyright ⓒ 2026 중앙대학교사범대부속초등학교 박세원. All rights reserved.</span>
          </div>
          <div className="footer-dates">
            <span>시행일: 2026.06.27</span>
            <span className="divider">|</span>
            <span>최근 변경일: 2026.06.27</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
