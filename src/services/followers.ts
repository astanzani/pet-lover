import { createOne, deleteOne, readAll } from '@db/followers';
import { readMany, scan } from '@db/pets';
import { FilterBuilder } from '@db/utils';
import { FollowingRelationship, PaginatedList, Pet } from '@types';

export const follow = (userId: string, petId: string) => {
  const relationship: FollowingRelationship = {
    userId,
    petId,
  };

  return createOne(relationship);
};

export const unfollow = (userId: string, petId: string) => {
  const relationship: FollowingRelationship = {
    userId,
    petId,
  };

  return deleteOne(relationship);
};

export const listAllFolloweesIds = async (
  userId: string
): Promise<string[]> => {
  const relationships = await readAll(userId);

  if (relationships == null) {
    throw new Error(`cannot get followees for user; id = ${userId}`);
  }

  return relationships.map((relationship) => relationship.petId);
};

export const getFollowees = async (
  userId: string,
  first: number,
  lastCursor?: string
): Promise<PaginatedList<Pet>> => {
  const allFolloweeIds = await listAllFolloweesIds(userId);

  const followees = await readMany(allFolloweeIds, first, lastCursor);

  if (followees == null) {
    throw new Error(`could not get followees for user; id = ${userId}`);
  }

  return followees;
};
