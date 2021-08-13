import React from 'react';
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Pets, NewPet } from '@screens';
import { Routes } from '@config';
import { PetsStackParamList } from '@types';

const Stack = createNativeStackNavigator<PetsStackParamList>();

export function PetsStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
      }}
    >
      <Stack.Screen
        name={Routes.PETS}
        component={Pets}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.NEW_PET}
        component={NewPet}
        options={{ title: 'Add a new pet' }}
      />
    </Stack.Navigator>
  );
}
