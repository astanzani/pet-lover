import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { lightTheme, mapToNavigationTheme } from './src/config';
import { Main } from './src';

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <SafeAreaProvider>
        <NavigationContainer theme={mapToNavigationTheme(lightTheme)}>
          <Main />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
