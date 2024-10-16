import React from 'react';

const VehicleList = ({ vehicles, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Lista de Veículos</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Placa</th>
            <th className="border px-4 py-2">Modelo</th>
            <th className="border px-4 py-2">Cor</th>
            <th className="border px-4 py-2">Taxa</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id_vehicle}>
              <td className="border px-4 py-2">{vehicle.license_plate}</td>
              <td className="border px-4 py-2">{vehicle.model}</td>
              <td className="border px-4 py-2">{vehicle.color}</td>
              <td className="border px-4 py-2">{vehicle.rate?.hourly_rate}</td>
              <td className="border px-4 py-2">
                <button onClick={() => onEdit(vehicle)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Editar
                </button>
                <button onClick={() => onDelete(vehicle.id_vehicle)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
