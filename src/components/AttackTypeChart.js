// src/components/AttackTypeChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttackTypeChart = ({ data }) => {
  // 统计每种攻击类型的数量
  const attackTypeCounts = data.reduce((acc, curr) => {
    if (curr.prediction !== 'BENIGN') {
      acc[curr.prediction] = (acc[curr.prediction] || 0) + 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(attackTypeCounts);
  const values = Object.values(attackTypeCounts);

  const chartData = {
    labels,
    datasets: [
      {
        label: '攻击类型',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '攻击类型占比',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default AttackTypeChart;
