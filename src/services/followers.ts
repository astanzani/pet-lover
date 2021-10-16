import { createOne, deleteOne, readAll } from '@db/followers';
import { readMany } from '@db/pets';
import {
  PaginatedPets,
  Pet,
  FollowingRelationship,
  Maybe,
} from '@generated/graphql';

export const follow = (userId: string, petId: string, ownerId: string) => {
  const relationship: FollowingRelationship = {
    userId,
    petId,
    ownerId,
  };

  return createOne(relationship);
};

export const unfollow = (userId: string, petId: string, ownerId: string) => {
  const relationship: FollowingRelationship = {
    userId,
    petId,
    ownerId,
  };

  return deleteOne(relationship);
};

export const listAllFollowingRelationships = async (
  userId: string
): Promise<FollowingRelationship[]> => {
  const relationships = await readAll(userId);

  if (relationships == null) {
    throw new Error(`cannot get followees for user; id = ${userId}`);
  }

  return relationships;
};

export const listAllFollowedRelationships = async (
  petId: string
): Promise<FollowingRelationship[]> => {
  const relationships = await readAll(petId, true);

  if (relationships == null) {
    throw new Error(`cannot get followers for pet; id = ${petId}`);
  }

  return relationships;
};

export const getFollowees = async (
  userId: string,
  first: number,
  lastCursor?: Maybe<string>
): Promise<PaginatedPets> => {
  const allFolloweeIds = await listAllFollowingRelationships(userId);

  const followees = await readMany(
    allFolloweeIds.map((r) => ({ petId: r.petId, userId: r.ownerId })),
    first,
    lastCursor
  );

  if (followees == null) {
    throw new Error(`could not get followees for user; id = ${userId}`);
  }

  return followees;
};
