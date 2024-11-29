import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
function handleQrCodeScan(vehicle) {
  const navigate = useNavigate();
  const qrCodeUrl = `https://parkzones-63e7e41af69c.herokuapp.com/entries-exits/active/${vehicle.license_plate}`;

  axios.get(qrCodeUrl)
    .then((response) => {
      console.log('Requisição bem-sucedida:', response.data);

      navigate('/payments');
    })
    .catch((error) => {
      console.error('Erro ao fazer a requisição:', error);
    });
}
