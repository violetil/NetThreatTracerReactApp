// src/components/DataTable.js
import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Source IP</th>
          <th>Destination IP</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.type}</td>
            <td>{item.source_ip}</td>
            <td>{item.destination_ip}</td>
            <td>{item.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
