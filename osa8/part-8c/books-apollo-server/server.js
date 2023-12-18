const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { gql } = require('apollo-server-micro');
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/Book');
const Author = require('./models/Author');

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


  const typeDefs = gql `
  type Query {
    bookCount: Int
    authorCount: Int
    allAuthors: [Author!]!
    allBooks: [Book!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: AuthorInput
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    setAuthorBorn(
      name: String!
      born: Int!
    ): Author
  }

  input AuthorInput {
    name: String!
    born: Int
  }
  
  type Author {
    name: String
    born: Int
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
`;


const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      return Book.find({})
    },

    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      return Author.find({})
    },
  },

  Mutation: {
    addBook: async (_, args) => {
      const { title, author, published, genres } = args;
  
      // Assuming Author is a mongoose model
      const newBook = new Book({
        title,
        author: new Author(author), // Ensure proper handling of author
        published,
        genres,
      });
  
      return newBook.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/* MUTATION, run this in Apollo Server */
/*
// ADD Reijo Mäki book
////

mutation {
  addBook(
    title: "Pimeyden tango",
    author: { name: "Reijo Mäki", born: 1958 },
    published: 1997,
    genres: ["crime"]
  ) {
    title
    author {
      name
    }
  }
}


// ADD Born to Reijo Mäki

mutation {
  editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
    name
    born
  }
}

*/

startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Palvelin toimii portissa : ${url}`);
  });