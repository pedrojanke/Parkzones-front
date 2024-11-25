import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Certifique-se de que você está usando react-router-dom
import { getActiveEntryByPlate } from '../api/entriesExitService';

const PaymentsPage = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  
  const location = useLocation();

  const fetchPaymentData = async (plate) => {
    setErrorMessage('');
    try {
      const entry = await getActiveEntryByPlate(plate);
      if (entry) {
        setPaymentData(entry);
      } else {
        setErrorMessage('Veículo não encontrado ou não ativo.');
      }
    } catch (error) {
      setErrorMessage('Erro ao buscar dados do veículo.');
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const plate = queryParams.get('license_plate');
    if (plate) {
      setLicensePlate(plate);
      fetchPaymentData(plate);
    }
  }, [location]);
  

  const handlePayment = async (e) => {
    e.preventDefault();
    if (licensePlate) {
      fetchPaymentData(licensePlate);
    }
  };

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Página de Pagamentos</h2>
      <form onSubmit={handlePayment} className="mb-4">
        <input
          type="text"
          placeholder="Digite a placa do veículo"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Buscar Pagamento
        </button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {paymentData && (
        <div>
          <h3 className="text-xl font-bold">Detalhes do Pagamento:</h3>
          <p>Placa: {paymentData.vehicle.license_plate}</p>
          <p>Valor Cobrado: R$ {paymentData.charged_amount}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
