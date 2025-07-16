import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { statDisplayNames } from '../utils/utils'; // Caminho corrigido: agora importa de utils.js

const StatsBarChart = ({ stats, languageName }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (stats && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const labels = Object.keys(stats).map(key => statDisplayNames[key] || key);
      const data = Object.values(stats);

      const maxStatValue = Math.max(...data);
      const dynamicSuggestedMax = Math.max(100, maxStatValue + (maxStatValue * 0.1));

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true,
              max: dynamicSuggestedMax,
              ticks: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              },
              ticks: {
                padding: 10,
              }
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `Estatísticas de Atributos de ${languageName}`,
              font: {
                size: 18
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [stats, languageName]);

  return (
    <div className="bar-chart-container-wrapper bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-full p-4">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default StatsBarChart;
