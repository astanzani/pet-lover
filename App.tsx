import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Auth } from '@aws-amplify/auth';
import { REACT_APP_USER_POOL_ID, REACT_APP_USER_POOL_CLIENT_ID } from '@env';

import { Feed, SignIn } from './src/screens';

Auth.configure({
  userPoolId: REACT_APP_USER_POOL_ID,
  userPoolWebClientId: REACT_APP_USER_POOL_CLIENT_ID,
});

export default function App() {
  return (
    <View style={styles.container}>
      <Feed />
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
