import React from 'react';

const EntryExitList = ({ entriesExits, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Placa do Veículo</th>
          <th className="border p-2">Data/Hora de Entrada</th>
          <th className="border p-2">Data/Hora de Saída</th>
          <th className="border p-2">Duração (minutos)</th> {/* Nova coluna */}
          <th className="border p-2">Valor Cobrado</th> {/* Nova coluna */}
          <th className="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {entriesExits.map((entryExit) => (
          <tr key={entryExit.id_movement}>
            <td className="border p-2">{entryExit.vehicle.license_plate}</td>
            <td className="border p-2">{entryExit.entry_time}</td>
            <td className="border p-2">{entryExit.exit_time}</td>
            <td className="border p-2">{entryExit.duration_minutes || 'N/A'}</td> {/* Duração */}
            <td className="border p-2">{entryExit.charged_amount ? `R$ ${entryExit.charged_amount}` : 'N/A'}</td> {/* Valor cobrado */}
            <td className="border p-2">
              <button
                onClick={() => onEdit(entryExit)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(entryExit.id_movement)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntryExitList;
