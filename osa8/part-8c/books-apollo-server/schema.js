const { gql } = require('apollo-server');


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
type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs