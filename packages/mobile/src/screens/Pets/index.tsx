import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, ScrollView } from 'react-native';
import { Title, Subheading, useTheme, FAB, Avatar } from 'react-native-paper';

import { useGetPetsQuery } from '@generated/graphql';
import { PetsStackParamList } from '../../types';
import { Routes } from '../../config';
import getStyles from './styles';

interface Props {
  navigation: NavigationProp<PetsStackParamList>;
}

export function Pets({ navigation }: Props) {
  const { data, error, loading } = useGetPetsQuery();
  const theme = useTheme();
  const styles = getStyles(theme);

  const onPressPlus = () => {
    navigation.navigate(Routes.NEW_PET);
  };

  if (loading) {
    return (
      <View>
        <Title>Loading...</Title>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View>
        <Title>{`Error: ${error}`}</Title>
      </View>
    );
  }

  const { pets } = data;

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
      <ScrollView>
        {pets.map((pet) => (
          <View key={pet.petId} style={styles.petCard}>
            {pet.picture ? (
              <Avatar.Image
                style={styles.petAvatar}
                source={{ uri: pet.picture }}
              />
            ) : (
              <Avatar.Icon style={styles.petAvatar} icon="paw" />
            )}
            <Title>{pet.name}</Title>
          </View>
        ))}
      </ScrollView>
      <FAB onPress={onPressPlus} icon="plus" style={styles.plusButton} />
    </View>
  );
}
