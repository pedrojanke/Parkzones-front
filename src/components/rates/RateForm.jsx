/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { createRate, updateRate } from '../../api/ratesService';

const RateForm = ({ onRateAdded, initialData, buttonText, rateToEdit, onEditComplete}) => {
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
      is_active: isActive
    };

    try {
      setError('');

      if (rateToEdit) {
        const updatedRate = await updateRate(rateToEdit.id_rate, rateData);
        onEditComplete(updatedRate);
      } else {
        const addedRate = await createRate(rateData);
        onRateAdded(addedRate);
      }

      setHourlyRate('');
      setVehicleType('');
      setIsActive(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Tipo de veículo já cadastrado.');
      } else {
        setError('Erro ao enviar dados do tarifa.');
      }
      console.error('Erro ao enviar dados do tarifa:', error);
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
