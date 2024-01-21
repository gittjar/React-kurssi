const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Import the products data
const products = require('./products.json');

// Use cors middleware
app.use(cors());

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Backend API is running at http://localhost:${port}/api/products`);
});

