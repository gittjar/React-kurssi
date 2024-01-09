import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text>Open up App.js to start working on your app! This is test!</Text>
      <RepositoryList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});