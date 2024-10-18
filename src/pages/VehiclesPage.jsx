import React, { useEffect, useState } from 'react';
import { deleteVehicle, getVehicles } from '../api/vehiclesService';
import VehicleForm from '../components/vehicles/vehicleForm';
import VehicleList from '../components/vehicles/VehicleList';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);

  const fetchVehicles = async () => {
    const vehiclesData = await getVehicles();
    setVehicles(vehiclesData);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleVehicleAdded = (newVehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  const handleEditClick = (vehicle) => {
    setVehicleToEdit(vehicle);
  };

  const handleEditComplete = (updatedVehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id_vehicle === updatedVehicle.id_vehicle ? updatedVehicle : vehicle
      )
    );
    setVehicleToEdit(null);
  };

  const handleDelete = async (id) => {
    await deleteVehicle(id);
    setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id_vehicle !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Veículos</h1>
      <VehicleForm
        onVehicleAdded={handleVehicleAdded}
        vehicleToEdit={vehicleToEdit}
        onEditComplete={handleEditComplete}
      />
      <VehicleList vehicles={vehicles} onEdit={handleEditClick} onDelete={handleDelete} />
    </div>
  );
};

export default VehiclesPage;
