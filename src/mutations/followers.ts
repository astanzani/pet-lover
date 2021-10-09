import { idFromTokenUserId } from '@db/utils';
import { follow } from '@services/followers';
import { ApolloContext } from '@types';

export const followersMutations = {
  followPet(
    _parent: any,
    { petId }: { petId: string },
    { userId }: ApolloContext
  ) {
    return follow(idFromTokenUserId(userId), petId);
  },
};
