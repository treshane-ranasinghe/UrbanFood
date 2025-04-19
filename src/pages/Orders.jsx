import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
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
