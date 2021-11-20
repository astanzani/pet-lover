import React from 'react';
import { Box } from '@mui/material';

import { Pet, useGetSuggestedPetsQuery } from 'generated/graphql';
import { PaginatedList } from 'components';

export function SideBar() {
  const { data, loading, error, fetchMore } = useGetSuggestedPetsQuery();

  if (loading) {
    return null;
  }

  if (error || !data) {
    const e = error ?? new Error('failed to get suggested pets');
    throw e;
  }

  const { suggestedPets } = data;

  const loadMore = async () => {
    if (suggestedPets.cursor) {
      await fetchMore({ variables: { cursor: suggestedPets.cursor } });
    }
  };
  const renderItem = (item: Pet) => <>{item.name}</>;
  const keyExtractor = (item: Pet) => item.petId;

  return (
    <Box>
      <PaginatedList
        items={suggestedPets.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        loadMore={loadMore}
      />
    </Box>
  );
}
