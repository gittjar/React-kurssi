const { ApolloServer, gql } = require('apollo-server');

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

  type Query {
    repositories: RepositoryConnection
    hello: String
  }
`;

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
  {
    id: 'code.slave',
    fullName: 'Pekka Kirves',
    description: 'Master of the code and breaker of chains',
    language: 'C# and Java',
    forksCount: 240023,
    stargazersCount: 564,
    ratingAverage: 666,
    reviewCount: 1,
    ownerAvatarUrl: 'https://digital.pictures.fi/kuvat/pizzatilaus-pic-db/burger003.jpg?img=smaller',
  }
];



// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hei maailma!',
    repositories: () => ({
      edges: repositories.map((repo) => ({
        node: repo,
      })),
    }),
  },
};

// Initialize the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});