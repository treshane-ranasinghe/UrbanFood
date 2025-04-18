// src/pages/Dashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { name: 'Products', path: '/products', color: '#ff7f50' },
    { name: 'Suppliers', path: '/suppliers', color: '#6a5acd' },
    { name: 'Customers', path: '/customers', color: '#20b2aa' },
    { name: 'Orders', path: '/orders', color: '#ffa500' },
    { name: 'Payments', path: '/payments', color: '#00bfff' },
    { name: 'Delivery', path: '/delivery', color: '#32cd32' },
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome to Urban Foods</h1>
      <h2>Admin Dashboard</h2>

      <div className="card-grid">
        {sections.map((section) => (
          <div
            key={section.name}
            className="dashboard-card"
            style={{ backgroundColor: section.color }}
            onClick={() => navigate(section.path)}
          >
            {section.name}
          </div>
        ))}
      </div>
    </div>
  );
};
