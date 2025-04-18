import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import Suppliers from './pages/Suppliers';
import SidebarLayout from './pages/SidebarLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Wrap these pages with sidebar layout */}
        <Route
          path="/dashboard"
          element={
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          }
        />
        <Route
          path="/products"
          element={
            <SidebarLayout>
              <Products />
            </SidebarLayout>
          }
        />
        <Route
          path="/suppliers"
          element={
            <SidebarLayout>
              <Suppliers />
            </SidebarLayout>
          }
        />
      </Routes>
    </Router>
  );
}
