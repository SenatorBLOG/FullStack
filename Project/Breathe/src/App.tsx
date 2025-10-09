import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BreathingPage from './pages/BreathingPage';
import LoginPage from './pages/LoginPage';
import StatsPage from './pages/StatsPage';
import './index.css';
// import { Footer } from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/breathing" element={<BreathingPage />} />
          <Route path="/sessions" element={<div>Your Sessions Page</div>} />
          <Route path="/statistics" element={<StatsPage />} />
          <Route path="/faq" element={<div>FAQ Page</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<div>Sign Up Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}
