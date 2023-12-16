const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { gql } = require('apollo-server-micro'); 


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


/*
  you can remove the placeholder query once your first one has been implemented 
*/

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
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
      setAuthorBorn(
        name: String!
        born: Int!
      ): Author
  }
  
  type Author {
    name: String
    born: Int
    bookCount: Int
  }
  
  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String!]
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: () => authors.map((author) => ({
      name: author.name,
      born: author.born,
      bookCount: books.filter((book) => book.author === author.name).length
    })),
    allBooks: () => books.map((book) => ({
        title: book.title,
        author: {
          name: book.author
        },
        published: book.published,
        genres: book.genres
      })),
  },

  Mutation: {
    editAuthor: (_, { name, setBornTo }) => {
      const author = authors.find((author) => author.name === name);

      if (!author) {
        throw new Error('Author not found');
      }

      author.born = setBornTo;
      return author;
    },
      
      setAuthorBorn: (_, { name, born }) => {
        const author = authors.find((author) => author.name === name);
        if (author) {
          author.born = born;
          return author;
        } else {
          return null;
        }
      },

    addBook: async (_, { title, author: authorName, published, genres }) => {
      // Check if the author already exists
      let existingAuthor = authors.find((author) => author.name === authorName);

      if (!existingAuthor) {
        // If the author doesn't exist, create a new author with a default birth year
        existingAuthor = {
          name: authorName,
          born: null, // You can set this to null or some default value
          bookCount: 0, // Initialize bookCount to 0 for new authors
        };
        authors.push(existingAuthor);
      }

      // Increment the bookCount for the author
      existingAuthor.bookCount++;

      const newBook = {
        title: title,
        author: existingAuthor.name,
        published,
        genres,
      };

      // Add the new book to the books array
      books.push(newBook);

      return newBook;
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

mutation {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
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