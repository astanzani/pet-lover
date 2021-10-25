import { DynamoDB } from 'aws-sdk';

import { FollowingRelationship } from '@generated/graphql';
import { create, get, query, remove } from './common';
import { PaginatedList } from '@types';
import { Maybe } from 'graphql/jsutils/Maybe';
import { decodeCursor } from './utils';
import { paginate } from './pagination';

interface FollowersTableKey {
  userId: string;
  petId: string;
}

export const createRelationship = async (
  input: FollowingRelationship
): Promise<FollowingRelationship> => {
  const followersTable = process.env.DYNAMODB_FOLLOWERS_TABLE;
  const relationship = await create(followersTable, input);
  return relationship;
};

export const deleteRelationship = async (
  input: FollowingRelationship
): Promise<FollowingRelationship | null> => {
  const followersTable = process.env.DYNAMODB_FOLLOWERS_TABLE;
  const key = { userId: input.userId, petId: input.petId };
  const item = await get<FollowingRelationship>(followersTable, key);
  await remove(followersTable, key);

  return item;
};

export async function listUserFollowees(
  userId: string,
  first: number,
  lastCursor?: Maybe<string>
): Promise<PaginatedList<FollowingRelationship> | null> {
  const followersTable = process.env.DYNAMODB_FOLLOWERS_TABLE;

  const followers = await query<FollowingRelationship>(followersTable, {
    userId,
  });

  return followers
    ? paginate(followers, { hash: 'userId', range: 'petId' }, first, lastCursor)
    : null;
}

export async function listPetFollowers(
  petId: string,
  first: number,
  lastCursor?: Maybe<string>
): Promise<PaginatedList<FollowingRelationship> | null> {
  const followersTable = process.env.DYNAMODB_FOLLOWERS_TABLE;

  const followers = await query<FollowingRelationship>(
    followersTable,
    { petId },
    true
  );

  return followers
    ? paginate(followers, { hash: 'userId', range: 'petId' }, first, lastCursor)
    : null;
}
