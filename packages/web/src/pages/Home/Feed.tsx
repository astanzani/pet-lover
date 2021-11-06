import React from 'react';
import { Box } from '@mui/system';
import { CircularProgress, Typography } from '@mui/material';

import { PaginatedList, PostCard } from 'components';
import { PostWithPet, useGetFeedPostsQuery } from 'generated/graphql';

export function Feed() {
  const { data, loading, error, fetchMore } = useGetFeedPostsQuery();

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    throw new Error('failed to get feed posts');
  }

  const { feedPosts } = data;

  const renderItem = (item: PostWithPet) => <PostCard post={item} />;
  const keyExtractor = (item: PostWithPet) => item.postId;
  const loadMore = async () => {
    if (feedPosts.cursor != null) {
      await fetchMore({ variables: { cursor: feedPosts.cursor } });
    }
  };

  return (
    <Box>
      <PaginatedList
        items={feedPosts.items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        loadMore={loadMore}
      />
      {!feedPosts.cursor && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="caption" gutterBottom={true}>
            No more posts to show
          </Typography>
        </Box>
      )}
    </Box>
  );
}
