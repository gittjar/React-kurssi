const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});


// http://localhost:3000/todos/statistics
router.get('/statistics', async (req, res) => {
  // Get the counter from Redis
  const addedTodos = await req.redis.getAsync('todoCount') || 0;

  // Send the counter back to the client
  res.json({ added_todos: Number(addedTodos) });
});

router.post('/', async (req, res) => {
  // Insert the new todo into the MongoDB database
  const newTodo = { text: req.body.text, done: req.body.done };
  const todo = new Todo(newTodo);
  const result = await todo.save();

  // Increment the counter in Redis
  await req.redis.setAsync('todoCount', (await req.redis.getAsync('todoCount') || 0) + 1);

  // Send the new todo back to the client
  res.json(result);
});


/* POST todo to listing. */
/*
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});
*/

const singleRouter = express.Router({ mergeParams: true });

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  if (text !== undefined) {
    req.todo.text = text;
  }
  if (done !== undefined) {
    req.todo.done = done;
  }
  await req.todo.save();
  res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;