import React, { useState } from 'react';
import axios from 'axios';
import './ReviewManagement.css'; // Reusing your CSS

const SalesReportGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState('');

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/urban-food/salesreport/generate', {
        startDate,
        endDate,
      });

      setReport(response.data); // set the full report data
      setMessage('Sales Report generated successfully!');
    } catch (error) {
      console.error('Error generating sales report:', error);
      setMessage('Failed to generate report. Please try again.');
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

      {message && (
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#6a5acd' }}>
          <strong>{message}</strong>
        </div>
      )}

      {report && (
        <div className="report-result" style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3>Sales Report Summary</h3>
          <table className="report-table" style={{ margin: '0 auto', marginTop: '15px' }}>
            <tbody>
              <tr>
                <td><strong>Sales Report ID:</strong></td>
                <td>{report.salesReportId}</td>
              </tr>
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
                <td>${report.totalSalesAmount.toFixed(2)}</td>
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
