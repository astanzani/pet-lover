import { idFromTokenUserId } from '@db/utils';
import { getFollowees } from '@services/followers';
import { ApolloContext } from '@types';

export const followersQueries = {
  followees(
    _parent: any,
    { first, cursor }: { first: number; cursor?: string },
    { userId }: ApolloContext
  ) {
    return getFollowees(idFromTokenUserId(userId), first, cursor);
  },
};
