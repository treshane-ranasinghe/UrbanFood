import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    orderId: '',
    productId: '',
    quantity: '',
    totalAmount: '',
    orderDate: '',
    customerID: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:8080/urban-food/orders';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API_URL);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
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
        orderId: '',
        productId: '',
        quantity: '',
        totalAmount: '',
        orderDate: '',
        customerID: ''
      });
      setEditingId(null);
      fetchOrders();
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleEdit = (order) => {
    setForm(order);
    setEditingId(order.orderId);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-container">
      <h2>Order Management</h2>

      <div className="order-form">
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={form.orderId}
          onChange={handleChange}
          disabled={editingId !== null}
        />
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={form.productId}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="totalAmount"
          placeholder="Total Amount"
          value={form.totalAmount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="orderDate"
          placeholder="Order Date"
          value={form.orderDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="customerID"
          placeholder="Customer ID"
          value={form.customerID}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update Order' : 'Add Order'}
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

      <div className="order-list">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.productId}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.customerID}</td>
                  <td>
                    <button onClick={() => handleEdit(order)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(order.orderId)}>
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

export default Orders;
