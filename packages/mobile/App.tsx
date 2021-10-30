import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Auth } from '@aws-amplify/auth';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { REACT_APP_USER_POOL_ID, REACT_APP_USER_POOL_CLIENT_ID } from '@env';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { lightTheme, mapToNavigationTheme, apolloConfig } from './src/config';
import { Main } from './src';

// console.log('USER POOL ID: ', REACT_APP_USER_POOL_ID);
// console.log('USER POOL CLIENT ID: ', REACT_APP_USER_POOL_CLIENT_ID);
// console.log('REACT_APP_API_ENDPOINT: ', REACT_APP_API_ENDPOINT);
// console.log('CONFIG: ', apolloConfig);

Auth.configure({
  userPoolId: REACT_APP_USER_POOL_ID,
  userPoolWebClientId: REACT_APP_USER_POOL_CLIENT_ID,
});
const client = new ApolloClient(apolloConfig);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={lightTheme}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <NavigationContainer theme={mapToNavigationTheme(lightTheme)}>
              <Main />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </ApolloProvider>
  );
}
