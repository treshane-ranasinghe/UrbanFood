import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Payments.css';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    paymentId: '',
    status: '',
    paymentMethod: '',
    amount: '',
    paymentDate: '',
    customerID: '',
    orderId: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:8080/urban-food/payments';

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(API_URL);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
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
        paymentId: '',
        status: '',
        paymentMethod: '',
        amount: '',
        paymentDate: '',
        customerID: '',
        orderId: ''
      });
      setEditingId(null);
      fetchPayments();
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const handleEdit = (payment) => {
    setForm(payment);
    setEditingId(payment.paymentId);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="payments-container">
      <h2>Payment Management</h2>

      <div className="payment-form">
        <input
          type="text"
          name="paymentId"
          placeholder="Payment ID"
          value={form.paymentId}
          onChange={handleChange}
          disabled={editingId !== null}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
        />
        <input
          type="text"
          name="paymentMethod"
          placeholder="Payment Method"
          value={form.paymentMethod}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="paymentDate"
          value={form.paymentDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="customerID"
          placeholder="Customer ID"
          value={form.customerID}
          onChange={handleChange}
        />
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={form.orderId}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update Payment' : 'Add Payment'}
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Payment ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="payment-list">
        {filteredPayments.length === 0 ? (
          <p className="no-payments">No payments found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Status</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Order ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td>{payment.paymentId}</td>
                  <td>{payment.status}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.paymentDate}</td>
                  <td>{payment.customerID}</td>
                  <td>{payment.orderId}</td>
                  <td>
                    <button onClick={() => handleEdit(payment)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(payment.paymentId)}>
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

export default Payments;
