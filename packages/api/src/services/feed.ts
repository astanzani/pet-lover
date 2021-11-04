import { uniqBy } from 'lodash';

import {
  addPostToFeeds as addPostToFeedsDb,
  listUserFeedItems,
} from '@db/feed';
import { getPets } from '@db/pets';
import { getPosts } from '@db/posts';
import {
  Maybe,
  PaginatedPostsWithPets,
  Post,
  PostWithPet,
} from '@generated/graphql';

export const addPostToFeeds = async (userIds: string[], post: Post) => {
  return addPostToFeedsDb(userIds, post);
};

export const getFeedPosts = async (
  userId: string,
  first: number,
  cursor?: Maybe<string>
): Promise<PaginatedPostsWithPets> => {
  const postsKeys = await listUserFeedItems(userId, first, cursor);

  if (postsKeys == null) {
    throw new Error(`cannot get feed items for user; id = ${userId}`);
  }

  const keys = postsKeys.items.map((key) => ({
    petId: key.petId,
    postId: key.postId,
  }));

  // No posts in feed
  if (keys.length === 0) {
    return {
      items: [],
      totalFound: 0,
      cursor: undefined,
    };
  }

  const posts = await getPosts(keys);

  if (posts == null) {
    throw new Error(`cannot get posts for user; userId = ${userId}`);
  }

  const petsKeys = uniqBy(
    posts.map((post) => ({
      petId: post.petId,
      userId: post.userId,
    })),
    'petId'
  );

  const pets = await getPets(petsKeys);

  const postsWithPets: PostWithPet[] = posts
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((post) => {
      const pet = pets?.find((p) => p.petId === post.petId);

      if (pet == null) {
        throw new Error(`cannot find pet for post; id = ${post.postId}`);
      }

      return {
        ...post,
        pet,
        __typename: 'PostWithPet',
      };
    });

  return {
    items: postsWithPets,
    cursor: postsKeys.cursor,
    totalFound: postsKeys.totalFound,
  };
};
