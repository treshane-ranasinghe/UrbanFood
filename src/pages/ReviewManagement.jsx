import React, { useEffect, useState } from 'react';
import './ReviewManagement.css'; // Reuse delivery styles
import axios from 'axios';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/urban-food/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="deliveries-container">
      <h2>Customer Reviews</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Customer or Product ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="delivery-list">
        {filteredReviews.length === 0 ? (
          <div className="no-deliveries">No reviews found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Customer ID</th>
                <th>Product ID</th>
                <th>Comment</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.customerId}</td>
                  <td>{review.productId}</td>
                  <td>{review.comment}</td>
                  <td>{review.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
