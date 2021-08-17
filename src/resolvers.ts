import { GraphQLUpload } from 'graphql-upload';

import { usersQueries } from './queries';
import { usersMutations, petsMutations } from './mutations';

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...usersQueries,
    testMessage: () => 'Hello World!',
  },
  Mutation: {
    ...usersMutations,
    ...petsMutations,
  },
};
