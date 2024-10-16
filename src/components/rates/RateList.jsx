import React from 'react';

const RateList = ({ rates, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Tarifa por hora</th>
          <th className="border p-2">Tipo do automóvel</th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate) => (
          <tr key={rate.rate_id}>
            <td className="border p-2">{rate.hourly_rate}</td>
            <td className="border p-2">{rate.vehicle_type}</td>
            <td className="border p-2">
              <button
                onClick={() => onEdit(rate)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(rate.rate_id)}
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

export default RateList;
