import { idFromTokenUserId } from '@db/utils';
import { Resolvers } from '@generated/graphql';
import { getFollowees } from '@services/followers';
import { ApolloContext } from '@types';

export const followersQueries: Resolvers<ApolloContext>['Query'] = {
  followees(_parent, { first, cursor }, { userId }) {
    return getFollowees(idFromTokenUserId(userId), first, cursor);
  },
};
