/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const RateForm = ({ onSubmitRate, initialData, buttonText, rateToEdit }) => {
  const [hourlyRate, setHourlyRate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setHourlyRate(initialData.hourly_rate);
      setVehicleType(initialData.vehicle_type);
      setIsActive(initialData.is_active);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rateData = {
      hourly_rate: hourlyRate,
      vehicle_type: vehicleType,
      is_active: isActive,
    };

    try {
      setError('');
      await onSubmitRate(rateData);
      setHourlyRate('');
      setVehicleType('');
      setIsActive(true);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setError('Tipo de veículo já cadastrado.');
        } else if (error.response.status === 400 && error.response.data.message === 'Tipo de veículo já cadastrado.') {
          setError('Tipo de veículo já cadastrado.');
        } else {
          setError('Erro ao enviar dados da tarifa.');
        }
      } else {
        setError('Erro ao enviar dados da tarifa.');
      }
      console.error('Erro ao enviar dados da tarifa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">{buttonText}</h2>
      <div className="mb-4">
        <label className="block mb-1">Tarifa por hora</label>
        <input
          type="number"
          step="0.01"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Tipo do automóvel</label>
        <input
          type="text"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default RateForm;
