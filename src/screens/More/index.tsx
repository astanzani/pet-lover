import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from '@aws-amplify/auth';
import { useTheme } from 'react-native-paper';

import { Button, UserCard } from '@components';
import { Routes } from '@config';
import getStyles from './styles';
import { RootStackParamList } from '@types';
import { NavigationProp } from '@react-navigation/core';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

export function More({ navigation }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const signOut = async () => {
    await Auth.signOut();
  };

  const goToFindPets = () => {
    navigation.navigate(Routes.FIND_PETS_TO_FOLLOW);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <UserCard />
      <Button style={styles.button} mode="contained" onPress={goToFindPets}>
        Find Pets to Follow
      </Button>
      <Button onPress={signOut}>Sign Out</Button>
    </SafeAreaView>
  );
}
