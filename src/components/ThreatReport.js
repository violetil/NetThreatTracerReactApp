// src/components/ThreatReport.js
import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import ThreatChart from './ThreatChart';

const ThreatReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 模拟从API获取数据
    fetch('/api/threat-data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const aggregatedData = data.reduce((acc, curr) => {
    const existing = acc.find(item => item.type === curr.type);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ type: curr.type, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div>
      <h1>Threat Report</h1>
      <ThreatChart data={aggregatedData} />
      <DataTable data={data} />
    </div>
  );
};

export default ThreatReport;
