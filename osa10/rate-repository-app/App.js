import Constants from 'expo-constants';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './utils/authStorage';
import AuthStorageContext from './contexts/AuthStorageContext';
import { ApolloProvider } from '@apollo/client';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { NativeRouter, Route, Routes, Link, Switch, Redirect } from "react-router-native";

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';
import SignIn from './components/SignIn';
import TestComponent from './components/TestComponent';


const authStorage = new AuthStorage();
const httpLink = createHttpLink({
  uri: Constants.manifest.extra.apolloUri,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});


const authLink = setContext(async (_, { headers }) => {
  const accessToken = await authStorage.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthStorageContext.Provider value={authStorage}>
        <View style={styles.container}>
          <NativeRouter>
            <AppBar />
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<RepositoryList />} />
              <Route path="/test" element={<TestComponent />} />
            </Routes>
          </NativeRouter>
          <StatusBar style="auto" />
        </View>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}