import React, { useState } from 'react';
import axios from 'axios';
import './ReviewManagement.css'; // Reusing your CSS

const SalesReportGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/salesreport/generate', {
        startDate,
        endDate
      });

      setMessage(response.data);
    } catch (error) {
      console.error('Error generating sales report:', error);
      setMessage('Failed to generate report. Please try again.');
    }
  };

  return (
    <div className="deliveries-container">
      <h2>Generate Sales Report</h2>
      <form onSubmit={handleGenerateReport} style={{ marginTop: '30px' }}>
        <div className="delivery-list">
          <table>
            <tbody>
              <tr>
                <td><strong>Start Date:</strong></td>
                <td>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><strong>End Date:</strong></td>
                <td>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="submit" className="delete-btn" style={{ marginTop: '15px' }}>
                    Generate Report
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>

      {message && (
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#6a5acd' }}>
          <strong>{message}</strong>
        </div>
      )}
    </div>
  );
};

export default SalesReportGenerator;
