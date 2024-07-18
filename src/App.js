// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ComputerPage from './pages/ComputerPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo">安全监控系统</div>
          <a href="http://localhost:5000/download/network-monitoring-software.exe" download className="download-link">
            下载网络流量检测软件
          </a>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/computer/:id" element={<ComputerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

