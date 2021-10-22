import { idFromTokenUserId } from '@db/utils';
import { Resolvers } from '@generated/graphql';
import { addPost } from '@services/posts';
import { ApolloContext, AddPostInput } from '@types';

export const postsMutations: Resolvers<ApolloContext>['Mutation'] = {
  addPost(_parent, { props }, { userId }) {
    return addPost(props, idFromTokenUserId(userId));
  },
};
