require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;


mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Bloglist = mongoose.model('Bloglist', blogSchema);

module.exports = Bloglist;
