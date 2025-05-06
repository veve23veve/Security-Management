import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterCompany from './pages/RegisterCompany';

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, background: '#121212' }}>
        <Link to="/" style={{ color: '#00ff88', marginRight: 15 }}>Home</Link>
        <Link to="/register" style={{ color: '#00ff88' }}>Register Company</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div style={{ color: '#00ff88', padding: '2rem' }}>
            <h1>🔥 Sekki Security Platform</h1>
            <p>✅ Live from Firebase Hosting.</p>
          </div>
        } />
        <Route path="/register" element={<RegisterCompany />} />
      </Routes>
    </Router>
  );
}

export default App;
