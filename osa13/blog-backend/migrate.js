const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug'); 

const sequelize = new Sequelize('blogdb', 'user2', 'secret2', {
  host: 'localhost',
  dialect: 'postgres',
});

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' }, // adjust this to your migration files path
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// a function to run when you want to execute your migrations
async function migrate() {
  await umzug.up();
  console.log('All migrations performed successfully');
}

migrate().catch(console.error);