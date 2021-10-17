import { Resolvers } from '@generated/graphql';
import { ApolloContext } from '@types';
import { getFeedPosts } from '@services/feed';
import { idFromTokenUserId } from '@db/utils';

export const postsQueries: Resolvers<ApolloContext>['Query'] = {
  feedPosts(_parent, { first, cursor }, { userId }) {
    return getFeedPosts(idFromTokenUserId(userId), first, cursor);
  },
};
