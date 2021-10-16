import { idFromTokenUserId } from '@db/utils';
import { Resolvers } from '@generated/graphql';
import { follow, unfollow } from '@services/followers';
import { ApolloContext } from '@types';

export const followersMutations: Resolvers<ApolloContext>['Mutation'] = {
  followPet(_parent, { petId, ownerId }, { userId }: ApolloContext) {
    return follow(idFromTokenUserId(userId), petId, ownerId);
  },
  unfollowPet(_parent, { petId, ownerId }, { userId }: ApolloContext) {
    return unfollow(idFromTokenUserId(userId), petId, ownerId);
  },
};
