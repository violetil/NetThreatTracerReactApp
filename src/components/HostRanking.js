// src/components/HostRanking.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HostRanking.css';

const HostRanking = ({ computers }) => {
  return (
    <div className="host-ranking">
      <h2>告警主机排名</h2>
      <ul>
        {computers.map((computer, index) => (
          <li key={computer._id}>
            <Link to={`/computer/${computer._id}`}>
              {index + 1}. {computer.name} (IP: {computer.ip}) - 攻击数量: {computer.attackTypes.length}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostRanking;
