import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import EntriesExitsPage from './pages/EntriesExitsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PaymentsPage from './pages/PaymentsPage';
import RatesPage from './pages/RatesPage';
import UsersPage from './pages/UsersPage';
import VehiclesPage from './pages/VehiclesPage';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || '';
  });

  const handleLogin = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
  };

  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-wide">Sistema de Gerenciamento</h1>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        )}
      </header>

      <Routes>
        <Route path="/users" element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} />
        <Route path="/rates" element={isAuthenticated ? <RatesPage /> : <Navigate to="/login" />} />
        <Route path="/vehicles" element={isAuthenticated ? <VehiclesPage /> : <Navigate to="/login" />} />
        <Route path="/entries-exits" element={isAuthenticated ? <EntriesExitsPage /> : <Navigate to="/login" />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/home" element={isAuthenticated ? <HomePage userType={userType} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
