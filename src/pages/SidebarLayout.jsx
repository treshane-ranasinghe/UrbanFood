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
        <button onClick={() => navigate('/')}>Dashboard</button>
        <button onClick={() => navigate('/products')}>Products</button>
        <button onClick={() => navigate('/suppliers')}>Suppliers</button>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
