import axios from 'axios';

const API_URL = 'https://parkzones-63e7e41af69c.herokuapp.com/rates';

export const getRates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createRate = async (rateData) => {
  const response = await axios.post(API_URL, rateData);
  return response.data;
};

export const updateRate = async (id, rateData) => {
  const response = await axios.patch(`${API_URL}/${id}`, rateData);
  return response.data;
};

export const deleteRate = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
