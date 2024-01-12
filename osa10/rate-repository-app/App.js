import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './components/SignIn';

import React from 'react';
import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';

import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <NativeRouter>
          <AppBar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<RepositoryList />} />
          </Routes>
        </NativeRouter>

        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});