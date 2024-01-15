import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { gql } from '@apollo/client';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { credentials: { username, password } } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: Credentials!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export default useSignIn;