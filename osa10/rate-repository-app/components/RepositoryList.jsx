import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      padding: 15,
      marginTop: 10,
      borderRadius: 5,
      border: '1px solid black',
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

const ItemSeparator = () => <View style={styles.separator} />;

const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };


  const RepositoryList = () => {
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