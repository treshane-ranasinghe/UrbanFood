import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Deliveries.css';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    deliveryId: '',
    orderId: '',
    deliveryStatus: '',
    deliveryAddress: '',
    deliveryDate: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:8080/urban-food/deliveries';

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get(API_URL);
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
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
        deliveryId: '',
        orderId: '',
        deliveryStatus: '',
        deliveryAddress: '',
        deliveryDate: ''
      });
      setEditingId(null);
      fetchDeliveries();
    } catch (error) {
      console.error('Error saving delivery:', error);
    }
  };

  const handleEdit = (delivery) => {
    setForm(delivery);
    setEditingId(delivery.deliveryId);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDeliveries();
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="deliveries-container">
      <h2>Delivery Management</h2>

      <div className="delivery-form">
        <input
          type="text"
          name="deliveryId"
          placeholder="Delivery ID"
          value={form.deliveryId}
          onChange={handleChange}
          disabled={editingId !== null}
        />
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={form.orderId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="deliveryStatus"
          placeholder="Delivery Status"
          value={form.deliveryStatus}
          onChange={handleChange}
        />
        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={form.deliveryAddress}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deliveryDate"
          placeholder="Delivery Date"
          value={form.deliveryDate}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update Delivery' : 'Add Delivery'}
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="delivery-list">
        {filteredDeliveries.length === 0 ? (
          <p className="no-deliveries">No deliveries found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Delivery ID</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Address</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.deliveryId}>
                  <td>{delivery.deliveryId}</td>
                  <td>{delivery.orderId}</td>
                  <td>{delivery.deliveryStatus}</td>
                  <td>{delivery.deliveryAddress}</td>
                  <td>{delivery.deliveryDate}</td>
                  <td>
                    <button onClick={() => handleEdit(delivery)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(delivery.deliveryId)}>
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

export default Deliveries;
