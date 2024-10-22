import axios from 'axios';
import { format } from 'date-fns';
import React from 'react';

const API_URL = 'http://localhost:3000/entries-exits/active';
const API_QR_URL = 'http://localhost:3000/entries-exits'; // URL para buscar o QR code

const EntryExitList = ({ entriesExits, onEdit, onDelete }) => {
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

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Placa do Veículo</th>
          <th className="border p-2">Tipo de Veículo</th>
          <th className="border p-2">Data/Hora de Entrada</th>
          <th className="border p-2">Data/Hora de Saída</th>
          <th className="border p-2">Duração (minutos)</th>
          <th className="border p-2">Valor Cobrado</th>
          <th className="border p-2">Ativo</th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {entriesExits.map((entryExit) => (
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
