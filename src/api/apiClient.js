import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://parkzones-63e7e41af69c.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
