const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require('./redis')

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use((req, res, next) => {
  req.redis = redis
  next()
})
app.use(logger('dev'));
app.use(express.json());
const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/api/todos', todosRouter);

module.exports = app;