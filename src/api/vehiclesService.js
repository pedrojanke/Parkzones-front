import axios from 'axios';

const API_URL = 'http://localhost:3000/vehicles';

export const getVehicles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await axios.post(API_URL, vehicleData);
  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await axios.patch(`${API_URL}/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
