import React from 'react';
import SidebarLayout from '../pages/SidebarLayout';
import './Dashboard.css';

export const Dashboard = () => {
  const sections = [
    { name: 'Products', path: '/products', color: '#ff7f50' },
    { name: 'Suppliers', path: '/suppliers', color: '#6a5acd' },
    { name: 'Customers', path: '/customers', color: '#20b2aa' },
    { name: 'Orders', path: '/orders', color: '#ffa500' },
    { name: 'Payments', path: '/payments', color: '#00bfff' },
    { name: 'Delivery', path: '/delivery', color: '#32cd32' },
  ];

  return (
    <SidebarLayout>
      <div className="dashboard-container">
        <h1>Welcome to Urban Foods</h1>
        <h2>Admin Dashboard</h2>

        <div className="card-grid">
          {sections.map((section) => (
            <div
              key={section.name}
              className="dashboard-card"
              style={{ backgroundColor: section.color }}
              onClick={() => window.location.href = section.path}
            >
              {section.name}
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};
