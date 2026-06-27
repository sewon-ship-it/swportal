import React, { useState, useEffect } from 'react';
import './App.css';
import { privacyPolicy, termsOfService } from './data/policies';
import AppCard from './components/AppCard';
import Footer from './components/Footer';
import PolicyModal from './components/PolicyModal';
import EthicsGate from './components/EthicsGate';
import Admin from './components/Admin';
import { db } from './firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

function App() {
  const [modalState, setModalState] = useState({ isOpen: false, title: '', content: '' });
  const [hasAcceptedEthics, setHasAcceptedEthics] = useState(false);
  const [apps, setApps] = useState([]);
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => setIsAdminRoute(window.location.hash === '#admin');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const q = query(collection(db, "apps"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const appsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApps(appsData);
      } catch (error) {
        console.error("Error fetching apps: ", error);
      }
    };
    if (!isAdminRoute && hasAcceptedEthics) {
      fetchApps();
    }
  }, [isAdminRoute, hasAcceptedEthics]);

  const openPolicy = () => {
    setModalState({ isOpen: true, title: '개인정보 처리방침', content: privacyPolicy });
  };

  const openTerms = () => {
    setModalState({ isOpen: true, title: '이용약관', content: termsOfService });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  if (isAdminRoute) {
    return (
      <div className="app-wrapper">
        <header className="header container" style={{ padding: '1rem 2rem' }}>
          <div className="logo-area">
            <h1><a href="#" style={{ color: 'inherit' }}>학습용 웹앱 포털</a> / 관리자 모드</h1>
          </div>
        </header>
        <Admin />
      </div>
    );
  }

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
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
          {apps.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              등록된 앱이 없습니다.
            </div>
          )}
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
