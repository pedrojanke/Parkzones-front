import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/usersService';
import LoginForm from '../components/login/LoginForm';

const LoginPage = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const data = await loginUser({ ...credentials, isLogin: true }); // Adiciona isLogin
      console.log('Login bem-sucedido:', data);
      onLogin(); // Chama a função de callback para indicar que o usuário está logado
      navigate('/users'); // Redireciona para a página de gerenciamento
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
