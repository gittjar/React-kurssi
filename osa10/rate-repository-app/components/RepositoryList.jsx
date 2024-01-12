import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import theme from '../components/theme';
import useRepositories from './useRepositories';

const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      padding: 15,
      marginTop: 10,
      borderRadius: 5,
      border: '1px solid black',
      fontFamily: theme.fonts.main
    },
    separator: {
      height: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center', // Align items vertically
      marginBottom: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    details: {
        marginLeft: 10,
    },
    counts: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    count: {
      textAlign: 'center',
      fontWeight: 'bold', // Make the counts bold
    },
    language: {
      backgroundColor: '#0366d6',
      color: 'white',
      padding: 5,
      borderRadius: 5,
      alignSelf: 'flex-start',
      marginBottom: 10,
    },
    fullName: {
      fontWeight: 'bold', // Make the full name bold
      marginBottom: 5,
    },
  });



const ItemSeparator = () => <View style={styles.separator} />;

const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };


  const RepositoryList = () => {
    const { repositories } = useRepositories(); // Use the hook
    return (
        <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
            <View style={styles.card}>
            <View style={styles.row}>
              <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl}} />
              <View style={styles.details}>
                <Text style={styles.fullName}>{item.fullName}</Text>
                <Text>{item.description}</Text>
                <Text style={styles.language}>{item.language}</Text>
              </View>
            </View>
            <View style={styles.counts}>
              <Text style={styles.count}>{formatCount(item.forksCount)} Forks</Text>
              <Text style={styles.count}>{formatCount(item.stargazersCount)} Stars</Text>
              <Text style={styles.count}>{formatCount(item.ratingAverage)} Rating</Text>
              <Text style={styles.count}>{formatCount(item.reviewCount)} Reviews</Text>
            </View>
          </View>
        )}
      />
    );
  };
  

export default RepositoryList;