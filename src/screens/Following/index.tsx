import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text, Title, useTheme } from 'react-native-paper';

import { useGetFolloweesQuery } from '@graphql/queries';
import { PaginatedList } from '@components';
import { Pet } from '@types';
import { UnfollowPetCard } from './UnfollowPetCard';
import getStyles from './styles';

export function Following() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { data, loading, error, fetchMore } = useGetFolloweesQuery();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !data) {
    console.log(JSON.stringify(error), null, 2);

    return (
      <View>
        <Text>{error?.message}</Text>
      </View>
    );
  }

  const keyExtractor = (item: Pet) => item.petId;
  const renderItem = (item: Pet) => <UnfollowPetCard pet={item} />;
  const loadMore = async () => {
    const { cursor } = followees;
    if (cursor) {
      await fetchMore({
        variables: { cursor: followees.cursor },
      });
    }
  };

  const { followees } = data;

  return (
    <View style={styles.root}>
      <Title>Following</Title>
      <PaginatedList
        items={followees.items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        loadMore={loadMore}
      />
    </View>
  );
}
