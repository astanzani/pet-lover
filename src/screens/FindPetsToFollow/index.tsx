import { useGetSuggestedPetsQuery } from '@graphql/queries';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PaginatedList } from '@components';
import { FollowPetCard } from './FollowPetCard';
import getStyles from './styles';
import { Pet } from '@types';

export function FindPetsToFollow() {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { data, loading, error, fetchMore } = useGetSuggestedPetsQuery({
    variables: { first: 15 },
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !data) {
    console.log(JSON.stringify(error, null, 2));

    return (
      <View>
        <Text>{error?.message}</Text>
      </View>
    );
  }

  const { suggestedPets } = data;

  const renderItem = (item: Pet) => <FollowPetCard pet={item} />;
  const keyExtractor = (item: Pet) => item.petId;
  const loadMore = async () => {
    const { cursor } = suggestedPets;
    if (cursor) {
      return fetchMore({ variables: { cursor: suggestedPets.cursor } });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <View style={styles.petsList}>
        <PaginatedList
          items={suggestedPets.items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          loadMore={loadMore}
        />
      </View>
    </SafeAreaView>
  );
}
