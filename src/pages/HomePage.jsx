import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

// Register necessary chart elements
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function HomePage({ userType }) {
  const [activeEntries, setActiveEntries] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [topModels, setTopModels] = useState({
    labels: [],
    datasets: [{
      label: 'Modelos mais frequentes',
      data: [],
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
    }]
  });

  useEffect(() => {
    axios
      .get('https://parkzones-63e7e41af69c.herokuapp.com/entries-exits')
      .then((response) => {
        const activeEntriesCount = response.data.filter((entry) => entry.is_active === true).length;
        setActiveEntries(activeEntriesCount);
        
        const totalRevenue = response.data
          .filter((entry) => entry.is_active === false)
          .reduce((sum, entry) => sum + (parseFloat(entry.charged_amount) || 0), 0);

        setTotalRevenue(totalRevenue);

        const totalMinutes = response.data
          .filter((entry) => entry.is_active === false)
          .reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);

        const totalHours = totalMinutes / 60;
        setTotalDuration(totalHours);
      })
      .catch((error) => console.error('Erro ao buscar entradas ativas:', error));

    axios
      .get('https://parkzones-63e7e41af69c.herokuapp.com/vehicles')
      .then((response) => {
        console.log(response.data);
        setTotalVehicles(response.data.length);
    
        const modelCount = response.data.reduce((acc, vehicle) => {
          acc[vehicle.model] = (acc[vehicle.model] || 0) + 1;
          return acc;
        }, {});
    
        const sortedModels = Object.entries(modelCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);
    
        const labels = sortedModels.map((model) => model[0]);
        const data = sortedModels.map((model) => model[1]);
    
        console.log(labels, data);
    
        setTopModels({
          labels: labels,
          datasets: [
            {
              label: 'Modelos mais frequentes',
              data: data,
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
          ],
        });
      })
      .catch((error) => console.error('Erro ao buscar veículos:', error));
  }, []);

  return (
    <div className="text-center mt-12">
      {/* Navigation Section */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {userType === 'admin' && (
          <Link to="/users">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
              Gerenciamento de Usuários
            </button>
          </Link>
        )}
        <Link to="/rates">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
            Gerenciamento de Tarifas
          </button>
        </Link>
        <Link to="/vehicles">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
            Gerenciamento de Veículos
          </button>
        </Link>
        <Link to="/entries-exits">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
            Gerenciamento de Entradas e Saídas
          </button>
        </Link>
      </div>

      {/* Dashboard Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Entradas Ativas</h2>
            <p className="text-5xl font-extrabold mt-4">
              {activeEntries}/100
            </p>
          </div>
          <div className="p-6 bg-green-500 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Veículos Cadastrados</h2>
            <p className="text-5xl font-extrabold mt-4">{totalVehicles}</p>
          </div>
          <div className="p-6 bg-purple-500 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Valor Total Arrecadado</h2>
            <p className="text-5xl font-extrabold mt-4">
              R$ {totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Tempo Total no Estacionamento</h2>
            <p className="text-5xl font-extrabold mt-4">
              {totalDuration.toFixed(2)} horas
            </p>
          </div>
        </div>

        {/* Gráfico dos 3 Modelos Mais Comuns */}
        <div className="p-6 bg-gray-300 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Top 3 Modelos Mais Comuns</h2>
          {topModels.labels.length > 0 ? (
            <div style={{ width: '40%', margin: '0 auto' }}>
              <Bar
                data={topModels}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Modelos mais frequentes',
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: 'top',
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Modelo',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Quantidade',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
                width={150}
                height={70}
              />
            </div>
          ) : (
            <p>Carregando gráficos...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
