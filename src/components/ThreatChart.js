// src/components/ThreatChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const ThreatChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.type),
    datasets: [
      {
        label: 'Threat Count',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ThreatChart;
