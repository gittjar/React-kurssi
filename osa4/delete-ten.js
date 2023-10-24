require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI; // Replace with your MongoDB Atlas URI
const collectionName = 'Bloglist'; // Replace with your collection name

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    const Bloglist = require('./models/bloglist'); // Import your Mongoose model
    
    const limit = 10; // Specify the limit
    for (let i = 0; i < limit; i++) {
      const result = await Bloglist.findOneAndDelete({});
      console.log(`Deleted document ${i + 1}:`, result);
    }
    console.log(`${result.deletedCount} documents deleted`);
  } catch (error) {
    console.error('Error deleting documents:', error);
  } finally {
    mongoose.connection.close();
  }
});
