import React from 'react';
import { FlatList } from 'react-native';

interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactElement;
  keyExtractor: (item: T) => string;
  loadMore: () => void;
}

export function PaginatedList<T>({
  items,
  renderItem,
  keyExtractor,
  loadMore,
}: Props<T>) {
  const renderItemInner = ({ item }: { item: T }) => {
    return renderItem(item);
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItemInner}
      keyExtractor={keyExtractor}
      onEndReached={loadMore}
    />
  );
}
