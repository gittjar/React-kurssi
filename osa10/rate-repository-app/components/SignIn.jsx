import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({ 
  text: {
    color: 'darkcyan',
    fontSize: 80,
    marginTop: 100

  }
});

const SignIn = () => {
  return <Text style={styles.text}>The sign-in view</Text>;
};

export default SignIn;