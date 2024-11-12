/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage({ userType }) {
  return (
    <div className="text-center mt-12">
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
  );
}

export default HomePage;
