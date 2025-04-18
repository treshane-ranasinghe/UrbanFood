import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    supplierId: '',
    supplierName: '',
    supplierContact: '',
    supplierAddress: '',
    supplierEmail: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:8080/urban-food/suppliers';

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(API_URL);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId !== null) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({
        supplierId: '',
        supplierName: '',
        supplierContact: '',
        supplierAddress: '',
        supplierEmail: ''
      });
      setEditingId(null);
      fetchSuppliers();
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  const handleEdit = (supplier) => {
    setForm(supplier);
    setEditingId(supplier.supplierId);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    (supplier?.supplierId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="suppliers-container">
      <h2>Supplier Management</h2>

      <div className="supplier-form">
        <input
          type="text"
          name="supplierId"
          placeholder="Supplier ID"
          value={form.supplierId}
          onChange={handleChange}
        
        />
        <input
          type="text"
          name="supplierName"
          placeholder="Supplier Name"
          value={form.supplierName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="supplierContact"
          placeholder="Contact Number"
          value={form.supplierContact}
          onChange={handleChange}
        />
        <input
          type="text"
          name="supplierAddress"
          placeholder="Address"
          value={form.supplierAddress}
          onChange={handleChange}
        />
        <input
          type="email"
          name="supplierEmail"
          placeholder="Email Address"
          value={form.supplierEmail}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </div>

      {/* 🔍 Search box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Supplier ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="supplier-list">
        {filteredSuppliers.length === 0 ? (
          <p className="no-suppliers">No suppliers found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.supplierId}>
                  <td>{supplier.supplierId}</td>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.supplierContact}</td>
                  <td>{supplier.supplierAddress}</td>
                  <td>{supplier.supplierEmail}</td>
                  <td>
                    <button onClick={() => handleEdit(supplier)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(supplier.supplierId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
