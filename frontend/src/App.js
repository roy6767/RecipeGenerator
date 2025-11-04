import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import page components
import HomePage from './pages/home-page/HomePage';
import ProfilePage from './pages/profile-page/ProfilePage';
import InputPage from './pages/input-page/InputPage';
import OutputPage from './pages/output-page/OutputPage';
import LoginPage from './pages/log-reg-page/LoginPage';
import RegisterPage from './pages/log-reg-page/RegPage';
import PrivacyPolicy from './pages/home-page/PrivacyPolicy';
import Cookies from './pages/home-page/Cookies';
import './pages/home-page/style/HomePage.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/output" element={<OutputPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
