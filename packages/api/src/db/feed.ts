import { Maybe, Post } from '@generated/graphql';
import { PaginatedList } from '@types';
import { decodeCursor } from './utils';
import { create, query } from './common';
import { paginate } from './pagination';

interface FeedsTableKey {
  userId: string;
  createdAt: string;
}

interface FeedsTableItem {
  userId: string;
  createdAt: string;
  postId: string;
  petId: string;
}

export const addPostToFeeds = async (
  userIds: string[],
  post: Post
): Promise<FeedsTableItem[]> => {
  const feedsTable = process.env.DYNAMODB_FEEDS_TABLE;
  const feedItems: FeedsTableItem[] = userIds.map((userId) => ({
    userId,
    petId: post.petId,
    postId: post.postId,
    createdAt: post.createdAt,
  }));
  const createdItems = await create(feedsTable, feedItems);
  return createdItems;
};

export const listUserFeedItems = async (
  userId: string,
  first: number,
  lastCursor?: Maybe<string>
): Promise<PaginatedList<FeedsTableItem> | null> => {
  const feedsTable = process.env.DYNAMODB_FEEDS_TABLE;
  const feedItems = await query<FeedsTableItem>(feedsTable, { userId });

  return feedItems
    ? paginate(
        feedItems,
        { hash: 'userId', range: 'createdAt' },
        first,
        lastCursor
      )
    : null;
};
