import axios from 'axios';
import { format } from 'date-fns';
import React from 'react';

const API_URL = 'http://localhost:3000/entries-exits/active';

const EntryExitList = ({ entriesExits, onEdit, onDelete }) => {
  const handlePayment = async (licensePlate) => {
    try {
      const response = await axios.get(`${API_URL}/${licensePlate}`);
      console.log('Dados do pagamento:', response.data);
    } catch (error) {
      console.error('Erro ao realizar o pagamento:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Placa do Veículo</th>
          <th className="border p-2">Data/Hora de Entrada</th>
          <th className="border p-2">Data/Hora de Saída</th>
          <th className="border p-2">Duração (minutos)</th>
          <th className="border p-2">Valor Cobrado</th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {entriesExits.map((entryExit) => (
          <tr key={entryExit.id_movement}>
            <td className="border p-2">{entryExit.vehicle.license_plate}</td>
            <td className="border p-2">{formatDate(entryExit.entry_time)}</td>
            <td className="border p-2">{entryExit.exit_time ? formatDate(entryExit.exit_time) : 'N/A'}</td>
            <td className="border p-2">{entryExit.duration_minutes || 'N/A'}</td>
            <td className="border p-2">{entryExit.charged_amount ? `R$ ${entryExit.charged_amount}` : 'N/A'}</td>
            <td className="border p-2">
              <button
                onClick={() => onEdit(entryExit)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(entryExit.id_movement)}
                className="bg-red-500 text-white p-2 rounded mr-2"
              >
                Excluir
              </button>
              <button
                onClick={() => handlePayment(entryExit.vehicle.license_plate)}
                className="bg-green-500 text-white p-2 rounded"
              >
                Pagar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntryExitList;
