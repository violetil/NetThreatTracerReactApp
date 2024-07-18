// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import HostRanking from '../components/HostRanking';
import AttackTypeRanking from '../components/AttackTypeRanking';
import DailyAttackPieChart from '../components/DailyAttackPieChart';
import './HomePage.css';

const HomePage = () => {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    // 获取所有告警电脑数据
    fetch('http://localhost:5000/api/computers')
      .then(response => response.json())
      .then(data => {
        // 按攻击数量排序
        const sortedComputers = data.sort((a, b) => b.attackTypes.length - a.attackTypes.length);
        setComputers(sortedComputers);
      });
  }, []);

  return (
    <div className="home-page">
      <HostRanking computers={computers} />
      <AttackTypeRanking />
      <DailyAttackPieChart />
    </div>
  );
};

export default HomePage;
