import { createOne, deleteOne, readAll } from '@db/followers';
import { FollowingRelationship } from '@types';

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

export const listAllFollowees = async (userId: string): Promise<string[]> => {
  const relationships = await readAll(userId);

  if (relationships == null) {
    throw new Error(`cannot get followees for user; id = ${userId}`);
  }

  return relationships.map((relationship) => relationship.petId);
};
