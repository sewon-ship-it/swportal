import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);
  
  // New App form state
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('개념');
  const [difficulty, setDifficulty] = useState('초급');
  const [time, setTime] = useState('5분');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchApps();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchApps = async () => {
    const querySnapshot = await getDocs(collection(db, "apps"));
    const appsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setApps(appsList);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleAddApp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "apps"), {
        title,
        objective,
        difficulty,
        time,
        url,
        createdAt: new Date()
      });
      setTitle('');
      setUrl('');
      fetchApps();
      alert("앱이 성공적으로 등록되었습니다!");
    } catch (error) {
      alert("앱 등록 실패: " + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 이 앱을 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "apps", id));
      fetchApps();
    }
  };

  if (!user) {
    return (
      <div className="admin-container">
        <div className="admin-login-form">
          <h2>관리자 로그인</h2>
          <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            선생님 계정(Google)으로 로그인해 주세요.
          </p>
          <button onClick={handleGoogleLogin} style={{ padding: '1rem', fontSize: '1.1rem' }}>
            Google 계정으로 로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>관리자 대시보드</h2>
        <button onClick={handleLogout} className="logout-btn">로그아웃</button>
      </div>

      <div className="admin-content">
        <div className="add-app-section">
          <h3>새로운 앱 등록 (Vercel 배포 주소 등)</h3>
          <form className="add-app-form" onSubmit={handleAddApp}>
            <input type="text" placeholder="앱 제목" value={title} onChange={e => setTitle(e.target.value)} required />
            <select value={objective} onChange={e => setObjective(e.target.value)}>
              <option value="개념">개념</option>
              <option value="문제풀이">문제풀이</option>
              <option value="프로젝트">프로젝트</option>
            </select>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
            <input type="text" placeholder="소요 시간 (예: 10분)" value={time} onChange={e => setTime(e.target.value)} required />
            <input type="url" placeholder="앱 URL (https://...)" value={url} onChange={e => setUrl(e.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? '등록 중...' : '등록하기'}</button>
          </form>
        </div>

        <div className="manage-apps-section">
          <h3>등록된 앱 목록</h3>
          <ul className="admin-app-list">
            {apps.map(app => (
              <li key={app.id} className="admin-app-item">
                <div className="app-info">
                  <strong>{app.title}</strong>
                  <span>({app.objective} / {app.difficulty} / {app.time})</span>
                  <a href={app.url} target="_blank" rel="noreferrer">링크 확인</a>
                </div>
                <button onClick={() => handleDelete(app.id)} className="delete-btn">삭제</button>
              </li>
            ))}
            {apps.length === 0 && <p>등록된 앱이 없습니다.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
