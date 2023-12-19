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


  const typeDefs = gql`
  type Query {
    bookCount: Int
    authorCount: Int
    allAuthors: [Author!]!
    allBooks: [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
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
    allBooks: async () => Book.find({}).populate('author'),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (_, args) => {
      const { title, author, published, genres } = args;

      // Check if the author already exists
      let authorObject = await Author.findOne({ name: author });

      // If the author doesn't exist, create a new one
      if (!authorObject) {
        authorObject = new Author({ name: author });
        await authorObject.save();
      }

      // Create the book with the author's ObjectId
      const newBook = new Book({
        title,
        author: authorObject._id,
        published,
        genres,
      });

      return newBook.save();
      
  },

  editAuthor: async (_, args) => {
    const { name, setBornTo } = args;
    return Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true });
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
    title: "This is testbook",
    author: "Veikko Virtanen",
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