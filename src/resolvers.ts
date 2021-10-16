import { GraphQLUpload } from 'graphql-upload';

import { Resolvers } from '@generated/graphql';
import { usersQueries, petsQueries, followersQueries } from './queries';
import {
  usersMutations,
  petsMutations,
  postsMutations,
  followersMutations,
} from './mutations';

export const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...usersQueries,
    ...petsQueries,
    ...followersQueries,
  },
  Mutation: {
    ...usersMutations,
    ...petsMutations,
    ...postsMutations,
    ...followersMutations,
  },
};
