// src/components/ComputerList.js
import React from 'react';
import { Link } from 'react-router-dom';

const ComputerList = ({ computers }) => {
  return (
    <ul>
      {computers.map(computer => (
        <li key={computer.id}>
          <Link to={`/computer/${computer.id}`}>{computer.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ComputerList;
