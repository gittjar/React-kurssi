import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, TextInput } from 'react-native';
import { useMutation, gql } from '@apollo/client';

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#0366d6',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: 320,
  },
  button: {
    backgroundColor: '#0366d6',
    color: 'white',
    textAlign: 'center',
    padding: 15,
    borderRadius: 5,
    overflow: 'hidden',
    width: 320,
  },
  message: {
    marginTop: 10,
    color: 'navy',
  },
});

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [authenticate, { data }] = useMutation(AUTHENTICATE);

  const handleSubmit = async () => {
    try {
      const result = await authenticate({ variables: { credentials: { username, password } } });
      setMessage('Login successful');
      console.log(result.data.authenticate.accessToken);
    } catch (error) {
      setMessage('Login failed');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable onPress={handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default SignIn;