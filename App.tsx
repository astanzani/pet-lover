import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Auth } from '@aws-amplify/auth';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  REACT_APP_USER_POOL_ID,
  REACT_APP_USER_POOL_CLIENT_ID,
  REACT_APP_API_ENDPOINT,
} from '@env';

import { lightTheme, mapToNavigationTheme } from './src/config';
import { Main } from './src';

Auth.configure({
  userPoolId: REACT_APP_USER_POOL_ID,
  userPoolWebClientId: REACT_APP_USER_POOL_CLIENT_ID,
});

const httpLink = createHttpLink({
  uri: REACT_APP_API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return new Promise((resolve) => {
    Auth.currentSession().then((session) => {
      const token = session.getIdToken().getJwtToken();
      resolve({
        headers: {
          ...headers,
          authorization: token,
        },
      });
    });
  });
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={lightTheme}>
        <SafeAreaProvider>
          <NavigationContainer theme={mapToNavigationTheme(lightTheme)}>
            <Main />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ApolloProvider>
  );
}
