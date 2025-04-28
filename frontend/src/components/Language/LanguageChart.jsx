import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './LanguageChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.7)`;
};

const LanguageChart = ({ languageData }) => {
  if (!languageData || !Array.isArray(languageData) || languageData.length === 0) {
    return <p>No language data available for chart.</p>;
  }

  const chartData = {
    labels: languageData.map(lang => lang.dialect),
    datasets: [
      {
        label: '% of Households',
        data: languageData.map(lang => parseFloat(lang.percentage)),
        backgroundColor: languageData.map(() => getRandomColor()),
        borderColor: languageData.map(() => 'rgba(255, 255, 255, 1)'),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed.toFixed(2) + '%';
            }
            return label;
          }
        }
      },
      title: {
        display: true,
        text: 'Language Distribution by Household Percentage',
        font: {
          size: 16
        }
      },
    },
  };

  return (
    <div className="language-chart-container">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default LanguageChart;
