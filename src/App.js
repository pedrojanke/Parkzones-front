import React, { useState } from 'react';
import EntriesExitsPage from './pages/EntriesExitsPage';
import RatesPage from './pages/RatesPage';
import Users from './pages/UsersPage';
import VehiclesPage from './pages/VehiclesPage';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
        <h1 className="text-4xl text-center font-bold tracking-wide">Sistema de Gerenciamento</h1>
      </header>

      {currentPage === '' ? (
        <div className="text-center mt-12">
          <p className="text-2xl mb-8 text-gray-700 font-medium">Selecione uma opção para começar:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => handlePageChange('users')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
            >
              Gerenciamento de Usuários
            </button>
            <button
              onClick={() => handlePageChange('rates')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
            >
              Gerenciamento de Tarifas
            </button>
            <button
              onClick={() => handlePageChange('vehicles')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
            >
              Gerenciamento de Veículos
            </button>
            <button
              onClick={() => handlePageChange('entriesExits')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
            >
              Gerenciamento de Entradas e Saídas
            </button>
          </div>
        </div>
      ) : (
        <div>
          <nav className="flex justify-center space-x-6 mt-8">
            <button
              onClick={() => handlePageChange('users')}
              className={`px-6 py-2 rounded-full font-medium ${currentPage === 'users' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition-transform transform hover:scale-105`}
            >
              Usuários
            </button>
            <button
              onClick={() => handlePageChange('rates')}
              className={`px-6 py-2 rounded-full font-medium ${currentPage === 'rates' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition-transform transform hover:scale-105`}
            >
              Tarifas
            </button>
            <button
              onClick={() => handlePageChange('vehicles')}
              className={`px-6 py-2 rounded-full font-medium ${currentPage === 'vehicles' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition-transform transform hover:scale-105`}
            >
              Veículos
            </button>
            <button
              onClick={() => handlePageChange('entriesExits')}
              className={`px-6 py-2 rounded-full font-medium ${currentPage === 'entriesExits' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition-transform transform hover:scale-105`}
            >
              Entradas e Saídas
            </button>
          </nav>

          <div className="container mx-auto p-8 bg-white shadow-xl mt-10 rounded-lg max-w-4xl">
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
