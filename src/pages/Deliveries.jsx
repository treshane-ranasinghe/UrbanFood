import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Deliveries.css';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:8080/urban-food/deliveries';

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get(API_URL);
      const normalized = response.data.map(delivery => ({
        deliveryId: delivery.DELIVERYID,
        orderId: delivery.ORDERID,
        deliveryStatus: delivery.DELIVERYSTATUS,
        deliveryAddress: delivery.DELIVERYADDRESS,
        deliveryDate: delivery.DELIVERYDATE,
      }));
      setDeliveries(normalized);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
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
    delivery.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="deliveries-container">
      <h2>Delivery Management</h2>

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
                  <td>{new Date(delivery.deliveryDate).toLocaleDateString()}</td>
                  <td>
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
