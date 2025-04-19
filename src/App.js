import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import Deliveries from './pages/Deliveries';
import Customer from './pages/Customer';
import AdminManagement from './pages/AdminManagement';
import SidebarLayout from './pages/SidebarLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
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

        {/* Payments */}
        <Route
          path="/payments"
          element={
            <SidebarLayout>
              <Payments />
            </SidebarLayout>
          }
        />

        {/* Deliveries */}
        <Route
          path="/deliveries"
          element={
            <SidebarLayout>
              <Deliveries />
            </SidebarLayout>
          }
        />

        {/* Customers */}
        <Route
          path="/customer"
          element={
            <SidebarLayout>
              <Customer />
            </SidebarLayout>
          }
        />

        {/* admin */}
        <Route
          path="/adminManagement"
          element={
            <SidebarLayout>
              <AdminManagement />
            </SidebarLayout>
          }
        />

      </Routes>
      
    </Router>
  );
}
