import React, { useEffect, useState } from 'react';

const UserForm = ({ onSubmit, initialData, buttonText }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUser_type] = useState('funcionario');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setUser_type(initialData.user_type || 'funcionario');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user_type) {
      alert('Por favor, selecione um tipo de usuário.');
      return;
    }

    onSubmit({ name, email, password, user_type });
    setName('');
    setEmail('');
    setPassword('');
    setUser_type('funcionario');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">{buttonText}</h2>
      <div className="mb-4">
        <label className="block mb-1">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Tipo de Usuário</label>
        <select
          value={user_type}
          onChange={(e) => setUser_type(e.target.value)}
          required
          className="w-full border rounded p-2"
        >
          <option value="funcionario">Funcionário</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};


export default UserForm;
