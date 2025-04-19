import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: '',
    productName: '',
    productDescription: '',
    productPrice: '',
    stockQuantity: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:8080/urban-food/products';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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
        productId: '',
        productName: '',
        productDescription: '',
        productPrice: '',
        stockQuantity: '',
        category: '',
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.productId);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Fixed search filter
  const filteredProducts = products.filter(product =>
    product.productId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <h2>Product Management</h2>

      <div className="product-form">
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={form.productId}
          onChange={handleChange}
          disabled={editingId !== null}
        />
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName} // Fixed to match the state key
          onChange={handleChange}
        />
        <input
          type="text"
          name="productDescription"
          placeholder="Description"
          value={form.productDescription} // Fixed to match the state key
          onChange={handleChange}
        />
        <input
          type="number"
          name="productPrice"
          placeholder="Price"
          value={form.productPrice} // Fixed to match the state key
          onChange={handleChange}
        />
        <input
          type="number"
          name="stockQuantity"
          placeholder="Stock Quantity"
          value={form.stockQuantity} // Fixed to match the state key
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      {/* 🔍 Search box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Product ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td> {/* Fixed to match the state key */}
                  <td>{product.productDescription}</td> {/* Fixed to match the state key */}
                  <td>{product.productPrice}</td> {/* Fixed to match the state key */}
                  <td>{product.stockQuantity}</td> {/* Fixed to match the state key */}
                  <td>{product.category}</td>
                  <td>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.productId)}>
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

export default Product;
