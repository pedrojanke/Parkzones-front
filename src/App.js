import React, { useState } from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import EntriesExitsPage from './pages/EntriesExitsPage';
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

      {isAuthenticated && location.pathname !== '/payments' && (
        <div className="text-center mt-12">
          <p className="text-2xl mb-8 text-gray-700 font-medium">Selecione uma opção para começar:</p>
          <div className="flex flex-wrap justify-center gap-6">
            {userType === 'admin' && (
              <Link to="/users">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
                  Gerenciamento de Usuários
                </button>
              </Link>
            )}
            <Link to="/rates">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
                Gerenciamento de Tarifas
              </button>
            </Link>
            <Link to="/vehicles">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
                Gerenciamento de Veículos
              </button>
            </Link>
            <Link to="/entries-exits">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
                Gerenciamento de Entradas e Saídas
              </button>
            </Link>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/users" element={isAuthenticated ? <UsersPage /> : <Navigate to="/" />} />
        <Route path="/rates" element={isAuthenticated ? <RatesPage /> : <Navigate to="/" />} />
        <Route path="/vehicles" element={isAuthenticated ? <VehiclesPage /> : <Navigate to="/" />} />
        <Route path="/entries-exits" element={isAuthenticated ? <EntriesExitsPage /> : <Navigate to="/" />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
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
