const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');



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

  module.exports = resolvers