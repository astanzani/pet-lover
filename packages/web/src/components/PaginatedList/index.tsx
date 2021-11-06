import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactElement;
  keyExtractor: (item: T) => string;
  loadMore: () => Promise<unknown>;
}

export function PaginatedList<T>({
  items,
  loadMore,
  keyExtractor,
  renderItem,
}: Props<T>) {
  const [loadingMore, setLoadingMore] = useState(false);
  const target = useRef<HTMLDivElement>(null);

  const observerCb: IntersectionObserverCallback = useCallback(
    async (entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        setLoadingMore(true);
        await loadMore();
        setLoadingMore(false);
      }
    },
    [loadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCb);
    if (target.current != null) {
      observer.observe(target.current);
    }

    return () => observer.disconnect();
  }, [observerCb]);

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {items.map((item) => (
        <li
          style={{ listStyleType: 'none', padding: 0 }}
          key={keyExtractor(item)}
        >
          {renderItem(item)}
        </li>
      ))}
      <div style={{ height: 1 }} ref={target} />
      {loadingMore && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </ul>
  );
}
