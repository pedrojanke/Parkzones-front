import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <Link className="text-white mr-4" to="/users">Usuários</Link>
        <Link className="text-white mr-4" to="/vehicles">Veículos</Link>
        <Link className="text-white mr-4" to="/rates">Taxas</Link>
        <Link className="text-white" to="/entries-exits">Entradas/Saídas</Link>
      </div>
    </nav>
  );
};

export default Navbar;
