import React, { useState } from 'react';
import './App.css';
import { appsData } from './data/apps';
import { privacyPolicy, termsOfService } from './data/policies';
import AppCard from './components/AppCard';
import Footer from './components/Footer';
import PolicyModal from './components/PolicyModal';
import EthicsGate from './components/EthicsGate';

function App() {
  const [modalState, setModalState] = useState({ isOpen: false, title: '', content: '' });
  const [hasAcceptedEthics, setHasAcceptedEthics] = useState(false);

  const openPolicy = () => {
    setModalState({ isOpen: true, title: '개인정보 처리방침', content: privacyPolicy });
  };

  const openTerms = () => {
    setModalState({ isOpen: true, title: '이용약관', content: termsOfService });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  if (!hasAcceptedEthics) {
    return <EthicsGate onAccept={() => setHasAcceptedEthics(true)} />;
  }

  return (
    <div className="app-wrapper">
      <header className="header container">
        <div className="logo-area">
          <h1>학습용 웹앱 포털</h1>
          <p>선생님이 만든 다양한 교육용 앱을 한 곳에서 만나보세요!</p>
        </div>
      </header>

      <main className="main-content container">
        <div className="apps-grid">
          {appsData.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </main>

      <Footer onOpenPolicy={openPolicy} onOpenTerms={openTerms} />
      
      <PolicyModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        title={modalState.title} 
        content={modalState.content} 
      />
    </div>
  );
}

export default App;
