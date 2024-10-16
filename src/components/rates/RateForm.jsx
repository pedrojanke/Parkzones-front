import React, { useEffect, useState } from 'react';

const RateForm = ({ onSubmit, initialData, buttonText }) => {
  const [hourlyRate, setHourlyRate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setHourlyRate(initialData.hourly_rate);
      setVehicleType(initialData.vehicle_type);
      setIsActive(initialData.is_active);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ hourly_rate: hourlyRate, vehicle_type: vehicleType, is_active: isActive });
    setHourlyRate('');
    setVehicleType('');
    setIsActive(true);
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

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default RateForm;
