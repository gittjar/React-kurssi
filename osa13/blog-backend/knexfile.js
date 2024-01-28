// knexfile.js

module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost', 
        user: 'postgres',
        password: 'secret',
        database: 'blogdb',
        port: 5432
      },
      migrations: {
        directory: './migrations'
      }
    }
  };