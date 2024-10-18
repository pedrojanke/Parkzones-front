import React, { useEffect, useState } from 'react';
import { createRate, deleteRate, getRates, updateRate } from '../api/ratesService';
import RateForm from '../components/rates/RateForm';
import RateList from '../components/rates/RateList';

const RatesPage = () => {
  const [rates, setRates] = useState([]);
  const [editingRate, setEditingRate] = useState(null);

  const fetchRates = async () => {
    const data = await getRates();
    setRates(data);
  };

  const handleCreateRate = async (rateData) => {
    await createRate(rateData);
    fetchRates();
  };

  const handleUpdateRate = async (id, rateData) => {
    await updateRate(id, rateData);
    fetchRates();
    setEditingRate(null);
  };

  const handleDeleteRate = async (id) => {
    await deleteRate(id);
    fetchRates();
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Tarifas</h1>

      <RateForm
        onSubmit={editingRate ? (data) => handleUpdateRate(editingRate.rate_id, data) : handleCreateRate}
        initialData={editingRate}
        buttonText={editingRate ? 'Atualizar Tarifa' : 'Criar Tarifa'}
      />

      <h2 className="text-2xl font-bold mt-6 mb-4">Tarifas já existentes</h2>
      <RateList rates={rates} onEdit={setEditingRate} onDelete={handleDeleteRate} />
    </div>
  );
};

export default RatesPage;
