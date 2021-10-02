import { createOne, deleteOne } from '@db/friendships';
import { buildPetId } from '@db/utils';
import { Friendship } from '@types';

export const follow = (petId: string, friendId: string) => {
  const followerId = buildPetId(petId);
  const followeeId = buildPetId(friendId);

  const friendship: Friendship = {
    petId: followerId,
    friendId: followeeId,
  };

  return createOne(friendship);
};

export const unfollow = (petId: string, friendId: string) => {
  const followerId = buildPetId(petId);
  const followeeId = buildPetId(friendId);

  const friendship: Friendship = {
    petId: followerId,
    friendId: followeeId,
  };

  return deleteOne(friendship);
};
