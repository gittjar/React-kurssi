// useRepositories.js
import { gql, useQuery } from '@apollo/client';

const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  console.log(data); 

  if (error) {
    console.error(error);
    return { repositories: [] };
  }

  if (loading) {
    return { repositories: [] };
  }

  return { repositories: data.repositories.edges.map(edge => edge.node) };
};

export default useRepositories;