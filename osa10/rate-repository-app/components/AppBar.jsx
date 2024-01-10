import { View, StyleSheet, Text, Pressable } from 'react-native'; // Import Text
import Constants from 'expo-constants';
import { Link } from 'react-router-native'; // Import Link
import React from 'react'; // Import React

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black', // Set background color to black
    height: 80, // Set height (5rem is typically 80 in React Native)
    justifyContent: 'center', // Center the text vertically
    alignItems: 'flex-start', // Align the text to the start
    width: '100%', // Set width to 100%
  },
  title: {
    color: 'white', // Set text color to white
    fontSize: 24, // Set text size
    textAlign: 'left', // Align the text to the left
    paddingLeft: 80, // Add left padding
  },
  link: {
    color: 'darkcyan',
    fontSize: 20,
    paddingLeft: 80,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Repositories</Text> {/* Use Text component for the title */}
      <Link to="/signin" >
            <Text style={styles.link}>Sign In</Text>
        </Link>

        <Link to="/">
            <Text style={styles.link}>Repositories</Text>
        </Link>
  
    </View>
  );
};

export default AppBar;