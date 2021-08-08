import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feed } from '@screens';
import { Routes } from '@config';
import { Button } from '@components';

function AnotherTabScreen() {
  return (
    <SafeAreaView
      focusable={true}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Button>Another</Button>
    </SafeAreaView>
  );
}

const Tab = createMaterialBottomTabNavigator();

export function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.FEED}
        component={Feed}
        options={{ tabBarIcon: 'home' }}
      />
      <Tab.Screen
        name="Settings"
        component={AnotherTabScreen}
        options={{ tabBarIcon: 'account-group' }}
      />
      <Tab.Screen
        name="Settings2"
        component={AnotherTabScreen}
        options={{ tabBarIcon: 'bell' }}
      />
      <Tab.Screen
        name="Settings3"
        key="d"
        component={AnotherTabScreen}
        options={{ tabBarIcon: 'menu' }}
      />
    </Tab.Navigator>
  );
}
