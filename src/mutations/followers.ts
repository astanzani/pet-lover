import { idFromTokenUserId } from '@db/utils';
import { follow, unfollow } from '@services/followers';
import { ApolloContext } from '@types';

export const followersMutations = {
  followPet(
    _parent: any,
    { petId, ownerId }: { petId: string; ownerId: string },
    { userId }: ApolloContext
  ) {
    return follow(idFromTokenUserId(userId), petId, ownerId);
  },
  unfollowPet(
    _parent: any,
    { petId, ownerId }: { petId: string; ownerId: string },
    { userId }: ApolloContext
  ) {
    return unfollow(idFromTokenUserId(userId), petId, ownerId);
  },
};
