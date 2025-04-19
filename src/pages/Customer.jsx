import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customer.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerID: '',
    customerUsername: '',
    customerEmail: '',
    customerAddress: '',
    customerContact: '',
    customerPassword: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:8080/urban-food/customers';

  useEffect(() => {
    fetchCustomers();
  }, []);

  const normalizeCustomer = (customer) => ({
    customerID: customer.CUSTOMERID,
    customerUsername: customer.CUSTOMERUSERNAME,
    customerEmail: customer.CUSTOMEREMAIL,
    customerAddress: customer.CUSTOMERADDRESS,
    customerContact: customer.CUSTOMERCONTACT,
    customerPassword: customer.CUSTOMERPASSWORD,
  });
  
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      const normalized = response.data.map(normalizeCustomer);
      setCustomers(normalized);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(API_URL, form);
      } else {
        await axios.post(API_URL, form);
      }
      resetForm();
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const resetForm = () => {
    setForm({
      customerID: '',
      customerUsername: '',
      customerEmail: '',
      customerAddress: '',
      customerContact: '',
      customerPassword: ''
    });
    setEditingId(null);
  };

  const handleEdit = (customer) => {
    setForm(customer);
    setEditingId(customer.customerID);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      fetchCustomers();
    } else {
      try {
        const response = await axios.get(`${API_URL}/search?keyword=${term}`);
        const normalized = response.data.map(normalizeCustomer);
        setCustomers(normalized);
      } catch (error) {
        console.error('Error searching customer:', error);
      }
    }
  };

  return (
    <div className="customers-container">
      <h2>Customer Management</h2>

      <div className="customer-form">
        <input
          type="text"
          name="customerID"
          placeholder="Customer ID"
          value={form.customerID}
          onChange={handleChange}
          disabled={editingId !== null}
        />
        <input
          type="text"
          name="customerUsername"
          placeholder="Username"
          value={form.customerUsername}
          onChange={handleChange}
        />
        <input
          type="email"
          name="customerEmail"
          placeholder="Email"
          value={form.customerEmail}
          onChange={handleChange}
        />
        <input
          type="text"
          name="customerAddress"
          placeholder="Address"
          value={form.customerAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          name="customerContact"
          placeholder="Contact"
          value={form.customerContact}
          onChange={handleChange}
        />
        <input
          type="password"
          name="customerPassword"
          placeholder="Password"
          value={form.customerPassword}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId ? 'Update Customer' : 'Add Customer'}
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Customer ID..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="customer-list">
        {customers.length === 0 ? (
          <p className="no-customers">No customers found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.customerID}>
                  <td>{cust.customerID}</td>
                  <td>{cust.customerUsername}</td>
                  <td>{cust.customerEmail}</td>
                  <td>{cust.customerAddress}</td>
                  <td>{cust.customerContact}</td>
                  <td>{cust.customerPassword}</td>
                  <td>
                    <button onClick={() => handleEdit(cust)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(cust.customerID)}>
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

export default Customer;
