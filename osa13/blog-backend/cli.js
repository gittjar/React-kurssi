const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',  
  database: 'blogdb',
  password: 'secret',
  port: 5433, 
});

pool.query('SELECT * FROM blogs', (err, result) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    result.rows.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
  }
  pool.end();
});