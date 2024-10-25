import React, { useEffect, useState } from 'react';
import { getActiveEntryByPlate } from '../../api/entriesExitService';
import { getVehicles } from '../../api/vehiclesService';

const EntryExitForm = ({ onSubmit, buttonText }) => {
  const [vehicleId, setVehicleId] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      const vehicleData = await getVehicles();
      setVehicles(vehicleData);
    };

    fetchVehicles();
  }, []);

  const handleVehicleChange = (e) => {
    setVehicleId(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedVehicle = vehicles.find(vehicle => vehicle.id_vehicle === vehicleId);

    if (selectedVehicle) {
      const activeEntry = await getActiveEntryByPlate(selectedVehicle.license_plate);

      if (activeEntry) {
        setErrorMessage('Já existe um veículo com a mesma placa no estacionamento!');
      } else {
        onSubmit({ vehicle: { id_vehicle: vehicleId } });
        setVehicleId('');
        setErrorMessage('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Veículo:</label>
        <input
          type="text"
          placeholder="Pesquise pela placa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
        <select
          value={vehicleId}
          onChange={handleVehicleChange}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          required
        >
          <option value="" disabled>
            Selecione um veículo
          </option>
          {vehicles
            .filter(vehicle => vehicle.license_plate.toLowerCase().includes(search.toLowerCase()))
            .map((vehicle) => (
              <option key={vehicle.id_vehicle} value={vehicle.id_vehicle}>
                {vehicle.license_plate} - {vehicle.model} - {vehicle.color}
              </option>
            ))}
        </select>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default EntryExitForm;
