import React from 'react';
import './TableView.css'; // Make sure this file exists

const TableView = () => {
  const products = [
    { id: 1, name: 'Laptop', price: 1200, quantity: 10, category: 'Technology' },
    { id: 2, name: 'Vitamins', price: 20, quantity: 100, category: 'Health' },
    { id: 3, name: 'Notebook', price: 5, quantity: 200, category: 'Education' },
  ];

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
