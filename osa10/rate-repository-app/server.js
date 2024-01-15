const { ApolloServer, gql } = require('apollo-server');
const repositories = require('./repositories');

// Define your type definitions
const typeDefs = gql`
  type Repository {
    id: ID!
    fullName: String
    description: String
    language: String
    forksCount: Int
    stargazersCount: Int
    ratingAverage: Int
    reviewCount: Int
    ownerAvatarUrl: String
  }

  type RepositoryEdge {
    node: Repository
  }

  type RepositoryConnection {
    edges: [RepositoryEdge]
  }

  type AuthenticateResult {
    accessToken: String
  }

  input AuthenticateInput {
    username: String!
    password: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type Query {
    repositories: RepositoryConnection
    hello: String
    me: User
  }

  type Mutation {
    authenticate(credentials: AuthenticateInput): AuthenticateResult
  }
`;


// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hei maailma!',
    repositories: () => ({
      edges: repositories.map((repo) => ({
        node: repo,
      })),
    }),

    me: (root, args, context) => {
      const userId = context.user.id;
      return getUserById(userId); 
    },
  },

  Mutation: {
    authenticate: (root, args) => {
      // Here you should check the credentials and return an access token.
      // This token should be unique to the user and stored to the database.
      if (args.credentials.username === 'username' && args.credentials.password === 'password') {
        return { accessToken: 'TESTI-token' };
      } else {
        throw new Error('Invalid credentials');
      }
    },
  },
};

// Initialize the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});