import axios from 'axios';

const API_URL = 'http://localhost:3000/rates';

export const getRates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createRate = async (rateData) => {
  const response = await axios.post(API_URL, rateData);
  return response.data;
};

export const updateRate = async (id, rateData) => {
  const response = await axios.put(`${API_URL}/${id}`, rateData);
  return response.data;
};

export const deleteRate = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
