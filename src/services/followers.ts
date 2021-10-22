import {
  createRelationship,
  deleteRelationship,
  listPetFollowers,
  listUserFollowees,
} from '@db/followers';
import { getPets } from '@db/pets';
import {
  PaginatedPets,
  Pet,
  FollowingRelationship,
  Maybe,
} from '@generated/graphql';
import { PaginatedList } from '@types';

export const follow = (userId: string, petId: string, ownerId: string) => {
  const relationship: FollowingRelationship = {
    userId,
    petId,
    ownerId,
  };

  return createRelationship(relationship);
};

export const unfollow = async (
  userId: string,
  petId: string,
  ownerId: string
) => {
  const relationship: FollowingRelationship = {
    userId,
    petId,
    ownerId,
  };

  const result = await deleteRelationship(relationship);

  if (result == null) {
    throw new Error(`failed to delete relationship`);
  }

  return result;
};

export const listFollowingRelationships = async (
  userId: string,
  first: number,
  cursor?: Maybe<string>
): Promise<PaginatedList<FollowingRelationship>> => {
  const relationships = await listUserFollowees(userId, first, cursor);

  if (relationships == null) {
    throw new Error(`cannot get followees for user; id = ${userId}`);
  }

  return relationships;
};

export const listFollowedRelationships = async (
  petId: string,
  first: number,
  cursor?: Maybe<string>
): Promise<PaginatedList<FollowingRelationship>> => {
  const relationships = await listPetFollowers(petId, first, cursor);

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
  const followeeRelationships = await listUserFollowees(
    userId,
    first,
    lastCursor
  );

  console.log('FOLLOWEES RELATIONSHIPS: ', followeeRelationships);

  if (followeeRelationships == null) {
    throw new Error(`could not get followees for user; id = ${userId}`);
  }

  const followees = await getPets(
    followeeRelationships.items.map((r) => ({
      petId: r.petId,
      userId: r.ownerId,
    }))
  );

  console.log('FOLLOWEES: ', followees);

  if (followees == null) {
    throw new Error(`could not get followees for user; id = ${userId}`);
  }

  return {
    items: followees,
    cursor: followeeRelationships.cursor,
    totalFound: followeeRelationships.totalFound,
  };
};
