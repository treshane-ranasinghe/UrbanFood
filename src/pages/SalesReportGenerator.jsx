import React, { useState } from 'react';
import axios from 'axios';
import './ReviewManagement.css';

const SalesReportGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null); // updated state
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/urban-food/salesreport/generate', {
        startDate,
        endDate,
      });

      setReport(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error generating sales report:', error);
      setErrorMessage('Failed to generate report. Please try again.');
      setReport(null);
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

      {errorMessage && (
        <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
          <strong>{errorMessage}</strong>
        </div>
      )}

      {report && (
        <div className="report-display" style={{ marginTop: '30px' }}>
          <h3 style={{ textAlign: 'center', color: '#6a5acd' }}>Sales Report</h3>
          <table className="report-table">
            <tbody>
              <tr>
                <td><strong>Start Date:</strong></td>
                <td>{new Date(report.startDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>End Date:</strong></td>
                <td>{new Date(report.endDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Total Orders:</strong></td>
                <td>{report.totalOrders}</td>
              </tr>
              <tr>
                <td><strong>Total Sales Amount:</strong></td>
                <td>Rs. {Number(report.totalSalesAmount).toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Generated At:</strong></td>
                <td>{new Date(report.generatedAt).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesReportGenerator;
