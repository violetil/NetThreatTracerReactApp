// src/components/RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ data }) => {
  // 提取并计算各项指标的均值
  const metrics = {
    'fwd_packets': '前向数据包数',
    'bwd_packets': '后向数据包数',
    'fwd_bytes': '前向字节数',
    'bwd_bytes': '后向字节数',
    'fwd_len_max': '前向最大长度',
    'bwd_len_max': '后向最大长度',
    'flow_duration': '流持续时间',
    'flow_bytes_per_s': '每秒流字节数',
    'flow_packets_per_s': '每秒流数据包数',
  };

  const aggregatedData = Object.keys(metrics).reduce((acc, key) => {
    acc[key] = data.reduce((sum, curr) => sum + curr[key], 0) / data.length;
    return acc;
  }, {});

  const chartData = {
    labels: Object.values(metrics),
    datasets: [
      {
        label: '网络流量与攻击指标',
        data: Object.values(aggregatedData),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
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
        text: '网络流量与攻击指标雷达图',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
