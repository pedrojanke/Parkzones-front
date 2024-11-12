import React, { useState } from "react";

const RateList = ({ rates, onEdit, onDelete }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (rateId) => {
    try {
      await onDelete(rateId); // Chama a função onDelete que você passar do componente pai
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage("Não é possível deletar uma tarifa em uso");
      } else {
        setErrorMessage("Erro ao tentar excluir a tarifa");
      }
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className="bg-red-500 text-white p-2 mb-4">{errorMessage}</div>
      )}
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
                  onClick={() => handleDelete(rate.rate_id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
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

export default RateList;
