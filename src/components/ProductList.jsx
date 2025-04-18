import React from 'react';
import axios from 'axios';

export default class ProductList extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    axios.get('http://localhost:8080/urban-food/products')
      .then(res => {
        const products = res.data;
        this.setState({ products });
      })
      .catch(err => {
        console.error("Error fetching products:", err);
      });
  }

  render() {
    return (
      <div>
        <h2>Product List</h2>
        <ul>
          {this.state.products.map(product => (
            <li key={product.productId}>
              <strong>ID:</strong> {product.productId}<br />
              <strong>Name:</strong> {product.name}<br />
              <strong>Price:</strong> ${product.price}<br />
              <strong>Description:</strong> {product.description}<br />
              <strong>Quantity:</strong> {product.stockQty}<br />
              <strong>Category:</strong> {product.category}<br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
