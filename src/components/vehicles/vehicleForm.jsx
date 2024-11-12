/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { getRates } from "../../api/ratesService";
import { createVehicle, updateVehicle } from "../../api/vehiclesService";

const VehicleForm = ({ onVehicleAdded, vehicleToEdit, onEditComplete }) => {
  const [licensePlate, setLicensePlate] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [rateId, setRateId] = useState("");
  const [rates, setRates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      const ratesData = await getRates();
      setRates(ratesData);
    };
    fetchRates();
  }, []);

  useEffect(() => {
    if (vehicleToEdit) {
      setLicensePlate(vehicleToEdit.license_plate);
      setModel(vehicleToEdit.model);
      setColor(vehicleToEdit.color);
      setRateId(vehicleToEdit.rate?.rate_id || "");
    }
  }, [vehicleToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vehicleData = {
      license_plate: licensePlate,
      model,
      color,
      rate_id: rateId,
    };

    try {
      setError("");

      if (vehicleToEdit) {
        const updatedVehicle = await updateVehicle(
          vehicleToEdit.id_vehicle,
          vehicleData
        );
        onEditComplete(updatedVehicle);
      } else {
        const addedVehicle = await createVehicle(vehicleData);
        onVehicleAdded(addedVehicle);
      }

      setLicensePlate("");
      setModel("");
      setColor("");
      setRateId("");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setError("A placa informada já está cadastrada no sistema.");
        } else if (error.response.status === 400) {
          const errorMessage =
            error.response.data?.message || "Erro ao enviar dados do veículo.";
          setError(errorMessage);
        } else {
          setError("Erro ao enviar dados do veículo.");
        }
      } else {
        setError("Erro ao enviar dados do veículo.");
      }
      console.error("Erro ao enviar dados do veículo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
      <h2 className="text-lg font-bold mb-2">
        {vehicleToEdit ? "Editar Veículo" : "Adicionar Veículo"}
      </h2>
      <input
        type="text"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        placeholder="Placa"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Modelo"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Cor"
        className="border p-2 mb-2 w-full"
        required
      />
      <select
        value={rateId}
        onChange={(e) => setRateId(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      >
        <option value="" disabled>
          Selecione a Taxa
        </option>
        {rates.map((rate) => (
          <option key={rate.rate_id} value={rate.rate_id}>
            {rate.vehicle_type} - R$ {rate.hourly_rate} / hora
          </option>
        ))}
      </select>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {vehicleToEdit ? "Atualizar Veículo" : "Adicionar Veículo"}
      </button>
    </form>
  );
};

export default VehicleForm;
