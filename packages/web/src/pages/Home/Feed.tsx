import React from 'react';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

import { PostCard } from 'components';
import { useGetFeedPostsQuery } from 'generated/graphql';

export function Feed() {
  const { data, loading, error } = useGetFeedPostsQuery();

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    throw new Error('failed to get feed posts');
  }

  const { feedPosts } = data;

  return (
    <Box>
      {feedPosts.items.map((item) => (
        <PostCard key={item.postId} post={item} />
      ))}
    </Box>
  );
}
