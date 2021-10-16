import { idFromTokenUserId } from '@db/utils';
import { getUserProfile } from '@services/users';
import { Resolvers } from '@generated/graphql';
import { ApolloContext } from '@types';

export const usersQueries: Resolvers<ApolloContext>['Query'] = {
  me(_parent, _args, { userId }) {
    return getUserProfile(idFromTokenUserId(userId));
  },
};
