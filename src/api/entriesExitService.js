import axios from 'axios';

const API_URL = 'http://localhost:3000/entries-exits';

export const getEntriesExits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEntryExit = async (entryExitData) => {
  console.log({entryExitData});

  const data = { 
    vehicle_id: entryExitData.vehicle.id_vehicle,
  }
  
  const response = await axios.post(API_URL, data);

  console.log({response});
  
  return response.data;
};

export const updateEntryExit = async (id, entryExitData) => {
  const response = await axios.put(`${API_URL}/${id}`, entryExitData);
  return response.data;
};

export const deleteEntryExit = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getActiveEntryByPlate = async (licensePlate) => {
  const response = await axios.get(`${API_URL}/activeEntry/${licensePlate}`);
  return response.data ? response.data : null;
};
