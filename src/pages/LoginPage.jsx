import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/usersService';
import LoginForm from '../components/login/LoginForm';

// eslint-disable-next-line react/prop-types
const LoginPage = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      console.log('Login bem-sucedido:', data);
      onLogin(data.user_type);
      
      localStorage.setItem('token', data.token);
      navigate('/home');
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
