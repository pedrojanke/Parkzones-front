// src/components/UserList.jsx
import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Lista de Usuários</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Nome</th>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Tipo</th>
            <th className="border border-gray-200 p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td className="border border-gray-200 p-2">{user.name}</td>
              <td className="border border-gray-200 p-2">{user.email}</td>
              <td className="border border-gray-200 p-2">{user.user_type}</td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user.user_id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
