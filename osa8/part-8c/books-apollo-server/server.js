const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/User')
const jwt = require('jsonwebtoken');

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*', // specify the domains that have access or '*' for all domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify the HTTP methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // specify the headers allowed
  },
  subscriptions: {
    path: '/subscriptions',
    onConnect: () => console.log('Connected to websocket'),
  }
});

/* MUTATION, run this in Apollo Server */
/*
// ADD book


mutation {
  addBook(
    title: "The Book Thief",
    author: "Markus Zusak",
    published: 2005,
    genres: ["historical fiction", "war"]
  ) {
    title
    author {
      name
    }
  }
}


// User creation and login

mutation {
  createUser (
    username: "username1"
    favoriteGenre: "Codespace"
  ) {
    username
    id
    favoriteGenre
  }
}

mutation {
  login (
    username: "username1"
    password: "secret"
  ) {
    value
  }
}

*/

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },


}).then(({ url }) => {
  console.log(`Server is running at: ${url}`);
});