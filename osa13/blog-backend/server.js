const express = require('express');
const app = express();
const port = 3000;
const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/users');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});