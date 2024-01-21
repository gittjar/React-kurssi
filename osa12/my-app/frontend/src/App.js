import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  console.log('Frontend is running at http://localhost/');

  return (
    <div className="App">
      <header className="App-header">
      <h1>Products </h1>
      <h3>Exercise 12.21 and 12.22</h3>
      </header>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Hinta: {product.price} €</p>
          </div>
          
        ))}
      </div>
      
      <div class='info-text'>
      Create a similar containerized development environment of one of your own full stack apps that you have created during the course or in your free time. You should structure the app in your submission repository as follows:
<br></br>
my-app/frontend/dev.Dockerfile
<br></br>
my-app/backend/dev.Dockerfile
<br></br>
my-app/docker-compose.yml
      </div>
    </div>
  );
}


export default App;