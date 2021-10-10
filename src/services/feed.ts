import { createMany } from '@db/feed';

export const addPostToFeeds = async (userIds: string[], postId: string) => {
  return createMany(userIds, postId);
};
