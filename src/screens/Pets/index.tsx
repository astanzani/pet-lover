import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Title, Subheading, useTheme, FAB } from 'react-native-paper';

import { PetsStackParamList } from '@types';
import { Routes } from '@config';
import getStyles from './styles';

interface Props {
  navigation: NavigationProp<PetsStackParamList>;
}

export function Pets({ navigation }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const onPressPlus = () => {
    navigation.navigate(Routes.NEW_PET);
  };

  // Get from server
  const pets = [];

  if (pets.length === 0) {
    return (
      <View style={styles.noPetsWrapper}>
        <Title>You have no pets yet :(</Title>
        <Subheading>
          Add one by clicking on the &apos;+&apos; button below.
        </Subheading>
        <FAB onPress={onPressPlus} icon="plus" style={styles.plusButton} />
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <Text>Pets</Text>
      <FAB onPress={onPressPlus} icon="plus" style={styles.plusButton} />
    </View>
  );
}
