import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);
  
  // New/Edit App form state
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('전 학년');
  const [subjects, setSubjects] = useState([]);
  const [unit, setUnit] = useState('');
  const [difficulty, setDifficulty] = useState('초급');
  const [time, setTime] = useState('5분');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const subjectOptions = ['국어', '수학', '사회', '과학', '도덕', '미술', '영어', '음악', '체육', '창체', '그 외: 생활지도'];

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

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSubjects(prev => 
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const appData = {
        title,
        grade,
        subjects,
        unit,
        difficulty,
        time,
        url,
        updatedAt: new Date()
      };
      
      if (editingId) {
        await updateDoc(doc(db, "apps", editingId), appData);
        alert("앱이 성공적으로 수정되었습니다!");
      } else {
        appData.createdAt = new Date();
        await addDoc(collection(db, "apps"), appData);
        alert("앱이 성공적으로 등록되었습니다!");
      }

      setTitle('');
      setGrade('전 학년');
      setSubjects([]);
      setUnit('');
      setDifficulty('초급');
      setTime('5분');
      setUrl('');
      setEditingId(null);
      fetchApps();
    } catch (error) {
      alert("앱 저장 실패: " + error.message);
    }
    setLoading(false);
  };

  const handleEdit = (app) => {
    setTitle(app.title || '');
    setGrade(app.grade || '전 학년');
    setSubjects(app.subjects || []);
    setUnit(app.unit || '');
    setDifficulty(app.difficulty || '초급');
    setTime(app.time || '5분');
    setUrl(app.url || '');
    setEditingId(app.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <h3>{editingId ? '앱 수정' : '새로운 앱 등록'}</h3>
          <form className="add-app-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="앱 제목" value={title} onChange={e => setTitle(e.target.value)} required />
            
            <select value={grade} onChange={e => setGrade(e.target.value)}>
              <option value="전 학년">전 학년</option>
              {[1, 2, 3, 4, 5, 6].map(g => (
                <option key={g} value={`초등 ${g}학년`}>초등 {g}학년</option>
              ))}
            </select>

            <div className="subjects-group">
              <label>과목 선택 (다중 선택 가능)</label>
              <div className="subjects-checkboxes">
                {subjectOptions.map(sub => (
                  <label key={sub} className="subject-label">
                    <input 
                      type="checkbox" 
                      value={sub} 
                      checked={subjects.includes(sub)}
                      onChange={handleSubjectChange} 
                    /> {sub}
                  </label>
                ))}
              </div>
            </div>

            <input type="text" placeholder="단원 / 단원명 (예: 1단원. 자연과 우리)" value={unit} onChange={e => setUnit(e.target.value)} />

            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
            <input type="text" placeholder="소요 시간 (예: 10분)" value={time} onChange={e => setTime(e.target.value)} required />
            <input type="url" placeholder="앱 URL (https://...)" value={url} onChange={e => setUrl(e.target.value)} required />
            
            <div className="form-actions">
              <button type="submit" disabled={loading}>{loading ? '저장 중...' : (editingId ? '수정하기' : '등록하기')}</button>
              {editingId && (
                <button type="button" onClick={() => {
                  setEditingId(null);
                  setTitle(''); setGrade('전 학년'); setSubjects([]); setUnit(''); setDifficulty('초급'); setTime('5분'); setUrl('');
                }} className="cancel-btn">취소</button>
              )}
            </div>
          </form>
        </div>

        <div className="manage-apps-section">
          <h3>등록된 앱 목록</h3>
          <ul className="admin-app-list">
            {apps.map(app => (
              <li key={app.id} className="admin-app-item">
                <div className="app-info">
                  <strong>{app.title}</strong>
                  <span>({app.grade} / {app.subjects?.join(', ')} / {app.difficulty} / {app.time})</span>
                  {app.unit && <span className="app-unit-text">단원: {app.unit}</span>}
                  <a href={app.url} target="_blank" rel="noreferrer">링크 확인</a>
                </div>
                <div className="admin-actions">
                  <button onClick={() => handleEdit(app)} className="edit-btn">수정</button>
                  <button onClick={() => handleDelete(app.id)} className="delete-btn">삭제</button>
                </div>
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
