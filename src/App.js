import React, { useState } from 'react';
import RatesPage from './pages/RatesPage';
import Users from './pages/UsersPage';
import VehiclesPage from './pages/VehiclesPage';
import EntriesExitsPage from './pages/EntriesExitsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1 className="text-3xl text-center p-4">Sistema de Gerenciamento</h1>

      {currentPage === '' ? (
        <div className="text-center mb-4">
          <p className="text-xl mb-4">Selecione uma opção para começar:</p>
          <button
            onClick={() => handlePageChange('users')}
            className="px-4 py-2 m-2 bg-blue-500 text-white"
          >
            Gerenciamento de Usuários
          </button>
          <button
            onClick={() => handlePageChange('rates')}
            className="px-4 py-2 m-2 bg-blue-500 text-white"
          >
            Gerenciamento de Tarifas
          </button>
          <button
            onClick={() => handlePageChange('vehicles')}
            className="px-4 py-2 m-2 bg-blue-500 text-white"
          >
            Gerenciamento de Veículos
          </button>
          <button
            onClick={() => handlePageChange('entriesExits')}
            className="px-4 py-2 m-2 bg-blue-500 text-white"
          >
            Gerenciamento de Entradas e Saídas
          </button>
        </div>
      ) : (
        <div>
          <nav className="text-center mb-4">
            <button
              onClick={() => handlePageChange('users')}
              className={`px-4 py-2 m-2 ${currentPage === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Gerenciamento de Usuários
            </button>
            <button
              onClick={() => handlePageChange('rates')}
              className={`px-4 py-2 m-2 ${currentPage === 'rates' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Gerenciamento de Tarifas
            </button>
            <button
              onClick={() => handlePageChange('vehicles')}
              className={`px-4 py-2 m-2 ${currentPage === 'vehicles' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Gerenciamento de Veículos
            </button>
            <button
              onClick={() => handlePageChange('entriesExits')}
              className={`px-4 py-2 m-2 ${currentPage === 'entriesExits' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Gerenciamento de Entradas e Saídas
            </button>
          </nav>

          <div className="container mx-auto p-4">
            {currentPage === 'users' && <Users />}
            {currentPage === 'rates' && <RatesPage />}
            {currentPage === 'vehicles' && <VehiclesPage />}
            {currentPage === 'entriesExits' && <EntriesExitsPage />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
