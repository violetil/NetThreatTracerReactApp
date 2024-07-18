// src/components/DailyAttackPieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getDailyAttackData } from '../api';
import './DailyAttackPieChart.css';

const DailyAttackPieChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDailyAttackData().then(data => {
      setData({
        labels: data.map(item => item.type),
        datasets: [{
          data: data.map(item => item.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
      });
    });
  }, []);

  if (!data) {
    return <div>加载中...</div>;
  }

  return (
    <div className="daily-attack-pie-chart">
      <h2>当日告警排名</h2>
      <Pie data={data} />
    </div>
  );
};

export default DailyAttackPieChart;

