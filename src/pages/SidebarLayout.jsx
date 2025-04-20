// src/components/SidebarLayout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SidebarLayout.css';

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2>Urban Foods</h2>
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/products')}>Products</button>
        <button onClick={() => navigate('/suppliers')}>Suppliers</button>
        <button onClick={() => navigate('/orders')}>Orders</button>
        <button onClick={() => navigate('/customer')}>Customers</button>
        <button onClick={() => navigate('/payments')}>Payments</button>
        <button onClick={() => navigate('/deliveries')}>Delivery</button>
        <button onClick={() => navigate('/AdminManagement')}>Admin Management</button>
        <button onClick={() => navigate('/ReviewManagement')}>Review Management</button>
        <button onClick={() => navigate('/salesReportGenerator')}>Sales Report</button>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
