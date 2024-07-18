// src/components/ComputerDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadReportAsPDF } from '../api';
import ThreatChart from './ThreatChart';
import './ComputerDetail.css';

const ComputerDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [computer, setComputer] = useState(null);

  useEffect(() => {
    // 获取计算机详细信息
    fetch(`http://localhost:5000/api/computers/${id}`)
      .then(response => response.json())
      .then(computer => setComputer(computer));

    // 获取流量数据
    fetch(`http://localhost:5000/api/computers/${id}/traffic`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [id]);

  if (!computer) {
    return <div>加载中...</div>;
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
            <h2>图表 1</h2>
            <ThreatChart data={data} />
          </div>
          <div className="chart-item">
            <h2>图表 2</h2>
            <ThreatChart data={data} />
          </div>
          <div className="chart-item">
            <h2>图表 3</h2>
            <ThreatChart data={data} />
          </div>
          <div className="chart-item">
            <h2>图表 4</h2>
            <ThreatChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerDetail;
