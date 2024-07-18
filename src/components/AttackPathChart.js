// src/components/AttackPathChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';

const AttackPathChart = ({ data }) => {
  if (data.length === 0) {
    return <div>无检测攻击</div>;
  }

  const eventTypes = [...new Set(data.map(item => item.event_type))];
  const eventTypeIndex = eventTypes.reduce((acc, eventType, index) => {
    acc[eventType] = index + 1;
    return acc;
  }, {});

  const chartData = {
    labels: data.map(item => format(new Date(item.timestamp), 'yyyy-MM-dd HH:mm:ss')),
    datasets: [
      {
        label: '攻击路径',
        data: data.map((item, index) => ({
          x: new Date(item.timestamp),
          y: eventTypeIndex[item.event_type]
        })),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        pointBackgroundColor: data.map(item =>
          item.event_type === "tcp_connection"
            ? 'red'
            : item.event_type === "http_request"
            ? 'blue'
            : 'green'
        ),
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
          displayFormats: {
            minute: 'HH:mm',
          },
        },
        title: {
          display: true,
          text: '时间'
        }
      },
      y: {
        type: 'linear',
        ticks: {
          callback: function (value) {
            return eventTypes[value - 1];
          },
          stepSize: 1
        },
        title: {
          display: true,
          text: '事件类型'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const event = data[index];
            return `时间: ${event.timestamp}, 类型: ${event.event_type}`;
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default AttackPathChart;