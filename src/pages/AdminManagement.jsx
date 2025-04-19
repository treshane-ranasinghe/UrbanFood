import React, { useEffect, useState } from 'react';
import './AdminManagement.css';
import axios from 'axios';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    adminID: '',
    adminEmail: '',
    adminUsername: '',
    adminAddress: '',
    adminContact: '',
    adminPassword: '',
  });

  const [searchId, setSearchId] = useState('');

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async () => {
    try {
      await axios.post('http://localhost:8080/admin', formData);
      fetchAdmins();
      setFormData({
        adminID: '',
        adminEmail: '',
        adminUsername: '',
        adminAddress: '',
        adminContact: '',
        adminPassword: '',
      });
    } catch (error) {
      console.error('Error saving admin:', error);
    }
  };

  const handleEdit = (admin) => {
    setFormData(admin);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/${id}`);
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.adminID.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <div className="suppliers-container">
      <h2>Admin Management</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Admin ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      <div className="supplier-form">
        <input
          type="text"
          name="adminID"
          placeholder="Admin ID"
          value={formData.adminID}
          onChange={handleChange}
        />
        <input
          type="email"
          name="adminEmail"
          placeholder="Email"
          value={formData.adminEmail}
          onChange={handleChange}
        />
        <input
          type="text"
          name="adminUsername"
          placeholder="Username"
          value={formData.adminUsername}
          onChange={handleChange}
        />
        <input
          type="text"
          name="adminAddress"
          placeholder="Address"
          value={formData.adminAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          name="adminContact"
          placeholder="Contact"
          value={formData.adminContact}
          onChange={handleChange}
        />
        <input
          type="password"
          name="adminPassword"
          placeholder="Password"
          value={formData.adminPassword}
          onChange={handleChange}
        />

        <button onClick={handleCreateOrUpdate}>
          {formData.adminID ? 'Save Admin' : 'Add Admin'}
        </button>
      </div>

      <div className="supplier-list">
        {filteredAdmins.length === 0 ? (
          <div className="no-suppliers">No admins found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin.adminID}>
                  <td>{admin.adminID}</td>
                  <td>{admin.adminEmail}</td>
                  <td>{admin.adminUsername}</td>
                  <td>{admin.adminAddress}</td>
                  <td>{admin.adminContact}</td>
                  <td>{admin.adminPassword}</td>
                  <td>
                    <button onClick={() => handleEdit(admin)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(admin.adminID)}>
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

export default AdminManagement;
