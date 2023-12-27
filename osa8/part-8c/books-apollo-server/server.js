const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { gql } = require('apollo-server-micro');
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/Book');
const Author = require('./models/Author');
const { ApolloError } = require('apollo-server-errors');
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


  const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allAuthors: [Author!]!
    allBooks(genre: String): [Book!]!
    allGenres: [String!]!
    me: User
    user(username: String!): User

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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    deleteBook(
      title: String!
    ): Book
  }


  type Author {
    name: String
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }
`;


const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (_, args) => {
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author');
      } else {
        return Book.find({}).populate('author');
      }
    },
    // context.currentUser contains the logged-in user
    me: async (_, __, context) => {
      return context.currentUser;
    },
    user: async (_, args) => {
      return User.findOne({ username: args.username });
    },
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({});
      const genres = books.map((book) => book.genres);
      const flattenedGenres = genres.flat();
      const uniqueGenres = [...new Set(flattenedGenres)];
      return uniqueGenres;
    },
  },

  Mutation: {

    addBook: async (_, args) => {
      const { title, author, published, genres } = args;

      if (title.length < 3 || author.length < 3) {
        throw new ApolloError('Title and author name must be at least 3 characters long');
      }

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

  deleteBook: async (_, args) => {
    const { title } = args;
    // Find the book by title
    const book = await Book.findOne({ title });
    if (!book) {
      throw new ApolloError('Book not found');
    }
    // Delete the book
    await Book.deleteOne({ title });
    // Return the deleted book
    return book;
  },

  editAuthor: async (_, args) => {
    const { name, setBornTo } = args;
    return Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true });
  },

  createUser: async (_, args) => {
    const { username, favoriteGenre } = args;
    // Create a new user + add the favorite genre
    const newUser = new User({ username, favoriteGenre });
    // Save the user to the database and return it
    return newUser.save();
  },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
        // hard-coded password for now
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },



};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*', // specify the domains that have access or '*' for all domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify the HTTP methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // specify the headers allowed
  },
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