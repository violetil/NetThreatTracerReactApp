// src/components/AttackTypeRanking.js
import React, { useEffect, useState } from 'react';
import { getAttackTypeRanking } from '../api';
import './AttackTypeRanking.css';

const AttackTypeRanking = () => {
  const [attackTypes, setAttackTypes] = useState(null);

  useEffect(() => {
    getAttackTypeRanking().then(data => setAttackTypes(data));
  }, []);

  if (!attackTypes) {
    return <div>加载中...</div>;
  }

  return (
    <div className="attack-type-ranking">
      <h2>告警类型排名</h2>
      <ul>
        {attackTypes.map((attack, index) => (
          <li key={index}>
            {attack.type} - {attack.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttackTypeRanking;

