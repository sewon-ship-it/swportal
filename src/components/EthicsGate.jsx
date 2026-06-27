import React from 'react';
import './EthicsGate.css';

const EthicsGate = ({ onAccept }) => {
  return (
    <div className="ethics-gate-overlay">
      <div className="ethics-gate-content">
        <h2>생성형 AI 활용 윤리 핵심가이드</h2>
        
        <div className="guideline-list">
          <div className="guideline-item">
            <span className="guideline-icon">1️⃣</span>
            <div>
              <h3>생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요.</h3>
              <p>모든 공부에 AI가 필요한 것은 아니므로, 지금 하는 활동에 정말 도움이 될지 먼저 고민해요.</p>
            </div>
          </div>
          <div className="guideline-item">
            <span className="guideline-icon">2️⃣</span>
            <div>
              <h3>생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요.</h3>
              <p>주제에 대해 내가 아는 것과 내 아이디어를 먼저 정리한 뒤에 AI를 활용하세요.</p>
            </div>
          </div>
          <div className="guideline-item">
            <span className="guideline-icon">3️⃣</span>
            <div>
              <h3>생성형 AI가 틀릴 수 있다는 점을 알아요.</h3>
              <p>알려준 내용은 항상 '정말 맞을까?' 하고 다른 방법으로 꼭 다시 확인하는 습관을 가져요.</p>
            </div>
          </div>
          <div className="guideline-item">
            <span className="guideline-icon">4️⃣</span>
            <div>
              <h3>생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요.</h3>
              <p>AI의 결과물을 그대로 사용하지 않고, 나의 경험과 생각을 더하여 나만의 결과물을 만들어요.</p>
            </div>
          </div>
          <div className="guideline-item">
            <span className="guideline-icon">5️⃣</span>
            <div>
              <h3>나의 정보와 비밀을 말하지 않아요.</h3>
              <p>이름, 주소, 학교 등 개인정보는 입력하지 않으며, 고민은 주변 사람들과 직접 나누어요.</p>
            </div>
          </div>
          <div className="guideline-item">
            <span className="guideline-icon">6️⃣</span>
            <div>
              <h3>생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요.</h3>
              <p>AI를 쓴 사실을 명확히 밝히는 정직한 태도가 나의 노력을 더 빛나게 합니다.</p>
            </div>
          </div>
        </div>

        <button className="accept-btn" onClick={onAccept}>
          나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
        </button>
      </div>
    </div>
  );
};

export default EthicsGate;
