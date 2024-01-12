import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

let appBarHeight = 100;
let paddingLeft = 80;
let fontSize = 24;

if (width < 321) {
  // Smaller devices like iPhone 5/SE
  appBarHeight = 60;
  paddingLeft = 10;
  fontSize = 18;
} else if (width <= 768) {
  // Medium devices like tablets
  appBarHeight = 70;
  paddingLeft = 70;
  fontSize = 22;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#050E56',
    height: appBarHeight,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: fontSize,
    textAlign: 'left',
    paddingLeft: paddingLeft,
    fontWeight: 'bold',
  },
  link: {
    color: 'white',
    fontSize: 18,
    paddingLeft: paddingLeft,
  },
  linkHover: {
    color: '#C0C0C0',
    fontSize: 18,
    paddingLeft: paddingLeft,
  },
  teksti: {
    color: 'white',
    fontSize: 12,
    paddingLeft: paddingLeft,
  },
});

const HoverableLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Text style={isHovered ? styles.linkHover : styles.link}>
        {children}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.teksti}>Part 10 - by gittjar - 2024</Text>
      <Text style={styles.title}>Repositories</Text>
      <ScrollView horizontal>
        <HoverableLink to="/signin">Sign In</HoverableLink>
        <HoverableLink to="/">Repositories</HoverableLink>
      </ScrollView>
    </View>
  );
};

export default AppBar;