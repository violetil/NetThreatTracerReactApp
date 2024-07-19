// src/components/ComputerDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadReportAsPDF } from '../api';
import AttackPathChart from './AttackPathChart';
import MapChart from './MapChart';
import AttackTypeChart from './AttackTypeChart';
import RadarChart from './RadarChart';
import './ComputerDetail.css';

const ComputerDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [attackPath, setAttackPath] = useState([]);
  const [computer, setComputer] = useState(null);

  useEffect(() => {
    // 获取计算机详细信息
    fetch(`http://178.128.209.118:5000/api/computers/${id}`)
      .then(response => response.json())
      .then(computer => setComputer(computer));

    // 获取流量数据
    fetch(`http://178.128.209.118:5000/api/computers/${id}/traffic`)
      .then(response => response.json())
      .then(data => setData(data));

    // 获取攻击行为路径数据
    console.log(`http://178.128.209.118:5000/api/computers/${id}/attackPath`);
    fetch(`http://178.128.209.118:5000/api/computers/${id}/attackPath`)
      .then(response => response.json())
      .then(attackPath => { setAttackPath(attackPath); console.log(attackPath) })
      .catch(error => console.error('Error fetching attack path:', error));
  }, [id]);

  if (!computer) {
    return <div>加载中...</div>;
  }

  if (computer?.attackTypes.length === 0 || (computer?.attackTypes.length === 1 && computer?.attackTypes[0] === 'BENIGN')) {
    return <h1>流量正常</h1>
  }

  return (
    <div className="computer-detail">
      <div className="computer-detail-header">
        <h1>主机 IP: {computer.ip}</h1>
        <button onClick={() => downloadReportAsPDF(data)}>下载威胁报告</button>
      </div>
      <div className="computer-detail-body">
        <div className="chart-grid">
          <div className="chart-item">
            <h2>攻击路径</h2>
            <AttackPathChart data={attackPath} />
          </div>
          <div className="chart-item">
            <h2>全球攻击源</h2>
            <MapChart data={data} />
          </div>
          <div className="chart-item">
            <h2>攻击类型占比</h2>
            <AttackTypeChart data={data} />
          </div>
          <div className="chart-item">
            <h2>网络流量与攻击指标</h2>
            <RadarChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerDetail;
