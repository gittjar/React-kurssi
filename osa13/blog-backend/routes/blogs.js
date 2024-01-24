// routes/blogs.js

const express = require('express');
const router = express.Router();
const getUserFromToken = require('../middleware/getUserFromToken');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'blogdb',
  password: 'secret',
  port: 5432,
});

// GET api/blogs (list all blogs)
router.get('/', (req, res) => {
    pool.query('SELECT * FROM blogs', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error executing query');
      } else {
        res.json(result.rows);
      }
    });
  });
  
  // POST api/blogs (add a new blog)
  router.post('/', getUserFromToken, async (req, res) => {
      const { author, title, likes, url } = req.body;
      pool.query('INSERT INTO blogs (author, title, likes, url) VALUES ($1, $2, $3, $4)', [author, title, likes, url], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing query');
        } else {
          res.status(201).send('Blog added');
        }
      });
    });
  
    // PUT api/blogs/:id (modify the like count of a blog)
  router.put('/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const { likes } = req.body;
      pool.query('UPDATE blogs SET likes = $1 WHERE id = $2', [likes, id], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing query');
        } else {
          res.status(200).send(`Blog modified with ID: ${id}`);
        }
      });
    });
  
  // DELETE api/blogs/:id (delete a blog)
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM blogs WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error executing query');
      } else {
        res.send('Blog deleted');
      }
    });
  });


module.exports = router;