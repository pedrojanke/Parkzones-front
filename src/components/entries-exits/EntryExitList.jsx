import axios from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';

const API_URL = 'http://localhost:3000/entries-exits/active';
const API_QR_URL = 'http://localhost:3000/entries-exits'; // URL para buscar o QR code

const EntryExitList = ({ entriesExits, onEdit, onDelete }) => {
  const [sortColumn, setSortColumn] = useState('entry_time'); // Coluna a ser ordenada
  const [sortDirection, setSortDirection] = useState('asc'); // Estado para armazenar a direção de ordenação

  const handlePayment = async (licensePlate, idMovement) => {
    try {
      // Primeiro, busca os dados para o pagamento
      const response = await axios.get(`${API_URL}/${licensePlate}`);
      console.log('Dados do pagamento:', response.data);
      
      // Atualiza o is_active para false usando PUT
      const updateResponse = await axios.put(`${API_QR_URL}/${idMovement}`, { is_active: false });
      console.log('Resposta da atualização:', updateResponse.data);

      // Atualiza a página após o pagamento
      window.location.reload();
    } catch (error) {
      console.error('Erro ao realizar o pagamento:', error.response ? error.response.data : error.message);
    }
  };

  const handleQRCode = async (id_movement) => {
    try {
      const response = await axios.get(`${API_QR_URL}/${id_movement}`);
      const qrCodeUrl = response.data.qr_code; // Supondo que o QR code venha no campo 'qr_code'

      // Abre o valor do QR code como imagem em uma nova aba
      if (qrCodeUrl) {
        const newWindow = window.open();
        newWindow.document.write(`<img src="${qrCodeUrl}" alt="QR Code" />`);
        newWindow.document.title = 'QR Code';
      }
    } catch (error) {
      console.error('Erro ao obter o QR code:', error.response ? error.response.data : error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  };

  // Função para alternar a direção de ordenação
  const toggleSortDirection = (column) => {
    setSortColumn(column);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  // Função para ordenar as entradas e saídas
  const sortedEntriesExits = [...entriesExits].sort((a, b) => {
    let valueA, valueB;

    switch (sortColumn) {
      case 'license_plate':
        valueA = a.vehicle.license_plate;
        valueB = b.vehicle.license_plate;
        break;
      case 'vehicle_type':
        valueA = a.vehicle.type;
        valueB = b.vehicle.type;
        break;
      case 'entry_time':
        valueA = new Date(a.entry_time);
        valueB = new Date(b.entry_time);
        break;
      case 'exit_time':
        valueA = a.exit_time ? new Date(a.exit_time) : null;
        valueB = b.exit_time ? new Date(b.exit_time) : null;
        break;
      case 'duration_minutes':
        valueA = a.duration_minutes;
        valueB = b.duration_minutes;
        break;
      case 'charged_amount':
        valueA = a.charged_amount;
        valueB = b.charged_amount;
        break;
      case 'is_active':
        valueA = a.is_active;
        valueB = b.is_active;
        break;
      default:
        valueA = new Date(a.entry_time);
        valueB = new Date(b.entry_time);
    }

    // Ordenar com base na direção de ordenação
    return sortDirection === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
  });

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th 
            className="border p-2 cursor-pointer" 
            onClick={() => toggleSortDirection('license_plate')}
          >
            Placa do Veículo {sortColumn === 'license_plate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th 
            className="border p-2 cursor-pointer" 
            onClick={() => toggleSortDirection('vehicle_type')}
          >
            Tipo de Veículo {sortColumn === 'vehicle_type' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th 
            className="border p-2 cursor-pointer" 
            onClick={() => toggleSortDirection('entry_time')}
          >
            Data/Hora de Entrada {sortColumn === 'entry_time' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th 
            className="border p-2 cursor-pointer" 
            onClick={() => toggleSortDirection('exit_time')}
          >
            Data/Hora de Saída {sortColumn === 'exit_time' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th 
            className="border p-2 cursor-pointer" 
            onClick={() => toggleSortDirection('duration_minutes')}
          >
            Duração (minutos) {sortColumn === 'duration_minutes' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th 
            className="border p-2 cursor-pointer" 
            onClick={() => toggleSortDirection('charged_amount')}
          >
            Valor Cobrado {sortColumn === 'charged_amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th 
            className="border p-2 cursor-pointer" 
            onClick={() => toggleSortDirection('is_active')}
          >
            Ativo {sortColumn === 'is_active' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {sortedEntriesExits.map((entryExit) => (
          <tr key={entryExit.id_movement}>
            <td className="border p-2">{entryExit.vehicle.license_plate}</td>
            <td className="border p-2">{entryExit.vehicle.type}</td>
            <td className="border p-2">{formatDate(entryExit.entry_time)}</td>
            <td className="border p-2">{entryExit.exit_time ? formatDate(entryExit.exit_time) : 'N/A'}</td>
            <td className="border p-2">{entryExit.duration_minutes || 'N/A'}</td>
            <td className="border p-2">{entryExit.charged_amount ? `R$ ${entryExit.charged_amount}` : 'N/A'}</td>
            <td className="border p-2">{entryExit.is_active ? 'Sim' : 'Não'}</td>
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
                onClick={() => handlePayment(entryExit.vehicle.license_plate, entryExit.id_movement)}
                className="bg-green-500 text-white p-2 rounded mr-2"
              >
                Pagar
              </button>
              <button
                onClick={() => handleQRCode(entryExit.id_movement)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                QRCode
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntryExitList;
