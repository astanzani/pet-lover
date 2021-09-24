import React, { useState, useRef } from 'react';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactElement;
  keyExtractor: (item: T) => string;
  loadMore: () => Promise<unknown>;
}

export function PaginatedList<T>({
  items,
  renderItem,
  keyExtractor,
  loadMore,
}: Props<T>) {
  const [loading, setLoading] = useState(false);
  const callOnScrollEnd = useRef<boolean>(false);

  const handleEndReached = () => {
    callOnScrollEnd.current = true;
  };

  const renderItemInner = ({ item }: { item: T }) => {
    return renderItem(item);
  };

  const loadMoreInner = async () => {
    setLoading(true);
    callOnScrollEnd.current && (await loadMore());
    callOnScrollEnd.current = false;
    setLoading(false);
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItemInner}
      keyExtractor={keyExtractor}
      onEndReached={handleEndReached}
      onMomentumScrollEnd={loadMoreInner}
      // onEndReachedThreshold={0.1}
      ListFooterComponent={loading ? ActivityIndicator : null}
    />
  );
}
