import { GraphQLUpload } from 'graphql-upload';

import { usersQueries, petsQueries } from './queries';
import { usersMutations, petsMutations, postsMutations } from './mutations';

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...usersQueries,
    ...petsQueries,
    testMessage: () => 'Hello World!',
  },
  Mutation: {
    ...usersMutations,
    ...petsMutations,
    ...postsMutations,
  },
};
