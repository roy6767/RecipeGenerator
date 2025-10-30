import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/home-page/HomePage';
import ProfilePage from './pages/profile-page/ProfilePage';
import InputPage from './pages/input-page/InputPage';
import OutputPage from './pages/output-page/OutputPage';
import LogRegPage from './pages/log-reg-page/LogRegPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/output" element={<OutputPage />} />
          <Route path="/auth" element={<LogRegPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
