import React from 'react';
import './Products.css';
import TableView from '../components/TableView';
import axios from 'axios';
import ProductList from '../components/ProductList';

export const Products = () => {
  return (
    <>
      {/* Products form section */}
      <div className="product-container">
        <div className="text">
          <h1>Products</h1>
        </div>

        <div className="inputs">
          <div className="input">
            <input type="text" placeholder="Enter Product ID" />
          </div>
          <div className="input">
            <input type="text" placeholder="Enter Product Name" />
          </div>
          <div className="input">
            <input type="text" placeholder="Enter Product Price" />
          </div>
          <div className="input">
            <input type="text" placeholder="Enter Product Description" />
          </div>
          <div className="input">
            <input type="text" placeholder="Enter Quantity" />
          </div>
          <div className="input">
            <select defaultValue="">
              <option value="" disabled>Select Category</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div className="buttons">
            <div className="button">Add</div>
            <div className="button">Update</div>
            <div className="button">Delete</div>
          </div>
        </div>
      </div>

      {/* TableView section OUTSIDE of product-container */}
      <div className="table-container-wrapper">
        <TableView />
      </div>

      <div className="product-list">
        <ProductList />
        </div>
    </>
  );
};
