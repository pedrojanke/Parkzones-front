// src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import { createUser, deleteUser, getUsers, updateUser } from '../api/usersService';
import UserForm from '../components/users/UserForm'; // Atualizado
import UserList from '../components/users/UserList'; // Atualizado

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
