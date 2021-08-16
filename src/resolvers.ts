import { GraphQLUpload } from 'graphql-upload';

import { usersQueries } from './queries';
import { usersMutations } from './mutations';

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...usersQueries,
    testMessage: () => 'Hello World!',
  },
  Mutation: {
    ...usersMutations,
  },
};
