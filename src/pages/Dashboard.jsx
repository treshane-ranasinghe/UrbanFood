import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiBox, FiTruck, FiUsers, FiShoppingCart,
  FiCreditCard, FiPackage, FiLogOut
} from 'react-icons/fi';
import './Dashboard.css';
import bgImage from '../assets/dash-img.jpg';

export const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { name: 'Products', path: '/products', color: '#ff7f50', icon: <FiBox size={24} /> },
    { name: 'Suppliers', path: '/suppliers', color: '#6a5acd', icon: <FiTruck size={24} /> },
    { name: 'Customers', path: '/customer', color: '#20b2aa', icon: <FiUsers size={24} /> },
    { name: 'Orders', path: '/orders', color: '#ffa500', icon: <FiShoppingCart size={24} /> },
    { name: 'Payments', path: '/payments', color: '#00bfff', icon: <FiCreditCard size={24} /> },
    { name: 'Delivery', path: '/deliveries', color: '#32cd32', icon: <FiPackage size={24} /> },
    { name: 'Admin Management', path: '/AdminManagement', color: '#ff7f50', icon: <FiPackage size={24} /> },
    { name: 'Review Management', path: '/ReviewManagement', color: '#20e3cc', icon: <FiPackage size={24} /> },
    { name: 'Sales Report', path: '/salesReportGenerator', color: '#20e3cc', icon: <FiPackage size={24} /> },
  ];

  const handleLogout = () => {
    // Clear any local storage/session if used
    localStorage.clear(); // or sessionStorage.clear();
  
    // Navigate to login page
    navigate('/');

  };

  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn" title="Logout">
          <FiLogOut size={20} style={{ marginRight: '5px' }} />
          Logout
        </button>
      </div>

      <div className="card-grid">
        {sections.map((section) => (
          <div
            key={section.name}
            className="dashboard-card"
            style={{ backgroundColor: section.color }}
            onClick={() => navigate(section.path)}
          >
            <div className="card-icon">{section.icon}</div>
            <h3>{section.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
