import { usersQueries } from './queries';
import { usersMutations } from './mutations';

export const resolvers = {
  Query: {
    ...usersQueries,
    testMessage: () => 'Hello World!',
  },
  Mutation: {
    ...usersMutations,
  },
};
