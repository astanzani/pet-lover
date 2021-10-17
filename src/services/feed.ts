import { createMany, query } from '@db/feed';
import { readMany as readManyPosts } from '@db/posts';
import { Maybe, PaginatedPosts } from '@generated/graphql';

export const addPostToFeeds = async (
  userIds: string[],
  postId: string,
  petId: string
) => {
  return createMany(userIds, postId, petId);
};

export const getFeedPosts = async (
  userId: string,
  first: number,
  cursor?: Maybe<string>
): Promise<PaginatedPosts> => {
  const postsKeys = await query(userId, first, cursor);

  if (postsKeys == null) {
    throw new Error(`cannot get feed items for user; userId = ${userId}`);
  }

  const keys = postsKeys.items.map((key) => ({
    petId: key.petId,
    postId: key.postId,
  }));

  const posts = await readManyPosts(keys);

  if (posts == null) {
    throw new Error(`cannot get posts for user; userId = ${userId}`);
  }

  return {
    items: posts,
    cursor: postsKeys.cursor,
    totalFound: postsKeys.totalFound,
  };
};
