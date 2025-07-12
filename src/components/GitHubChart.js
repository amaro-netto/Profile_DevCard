import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GitHubChart = ({ labels, data, username, otherLanguages }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (labels.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const maxDataValue = Math.max(...data);
      const dynamicSuggestedMax = Math.max(20, maxDataValue + (maxDataValue * 0.1));

      chartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Porcentagem de Repositórios',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
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
          layout: {
              padding: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 10
              }
          },
          elements: {
            line: {
              borderWidth: 3
            }
          },
          scale: {
            r: {
              angleLines: {
                  display: false
              },
              suggestedMin: 0,
              suggestedMax: dynamicSuggestedMax,
              ticks: {
                  display: false,
              },
              pointLabels: {
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `Top 5 Linguagens por Repositório Principal de ${username}`,
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
  }, [labels, data, username]);

  const maxTags = 5;
  const displayedLanguages = otherLanguages.slice(0, maxTags);
  const hasMoreLanguages = otherLanguages.length > maxTags;

  return (
    <div className="chart-container-wrapper bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-full">
      <canvas ref={chartRef} style={{ width: '100%', height: '380px' }}></canvas>
      <div className="other-languages-tags flex flex-wrap justify-center gap-2 mt-4 px-2" style={{ minHeight: '28px', overflow: 'visible', alignItems: 'center' }}>
        {displayedLanguages.map((lang, index) => (
          <span
            key={lang}
            className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"
          >
            {lang}
          </span>
        ))}
        {hasMoreLanguages && (
          <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            ...
          </span>
        )}
      </div>
    </div>
  );
};

export default GitHubChart;
