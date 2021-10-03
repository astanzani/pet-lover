import { follow } from '@services/followers';
import { AddPetInput, ApolloContext } from '@types';

export const followersMutations = {
  followPet(
    _parent: any,
    { petId }: { petId: string },
    { userId }: ApolloContext
  ) {
    return follow(userId, petId);
  },
};
