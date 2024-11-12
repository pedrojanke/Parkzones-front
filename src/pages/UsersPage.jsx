import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser, deleteUser, getUsers, updateUser } from '../api/usersService';
import UserForm from '../components/users/UserForm';
import UserList from '../components/users/UserList';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
  };

  const handleCreateUser = async (userData) => {
    await createUser(userData);
    fetchUsers();
  };

  const handleUpdateUser = async (userData) => {
    await updateUser(selectedUser.user_id, userData);
    fetchUsers();
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/home" className="text-blue-500 hover:text-blue-700 font-semibold">
        ← Voltar
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
      
      <UserForm
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        initialData={selectedUser}
        buttonText={selectedUser ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
      />
      
      <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
    </div>
  );
};

export default Users;
