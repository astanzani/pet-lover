import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feed, More } from '@screens';
import { Routes } from '@config';
import { Button } from '@components';
import { PetsStack } from '../Pets';
import { NewPostStack } from '../NewPost';

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
        name={Routes.NEW_POST_STACK}
        component={NewPostStack}
        options={{ tabBarIcon: 'image-plus', title: 'New Post' }}
      />
      <Tab.Screen
        name="Settings"
        component={AnotherTabScreen}
        options={{ tabBarIcon: 'account-group' }}
      />
      <Tab.Screen
        name={Routes.PETS_STACK}
        component={PetsStack}
        options={{ tabBarIcon: 'paw', title: 'My Pets' }}
      />
      <Tab.Screen
        name={Routes.MORE}
        component={More}
        options={{ tabBarIcon: 'menu' }}
      />
    </Tab.Navigator>
  );
}
