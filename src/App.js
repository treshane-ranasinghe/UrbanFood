import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders'; // <-- ✅ Import Orders
import SidebarLayout from './pages/SidebarLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <SidebarLayout>
              <Products />
            </SidebarLayout>
          }
        />

        {/* Suppliers */}
        <Route
          path="/suppliers"
          element={
            <SidebarLayout>
              <Suppliers />
            </SidebarLayout>
          }
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={
            <SidebarLayout>
              <Orders />
            </SidebarLayout>
          }
        />
      </Routes>
    </Router>
  );
}
