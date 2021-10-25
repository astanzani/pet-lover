import { GraphQLUpload } from 'graphql-upload';

import { Resolvers } from '@generated/graphql';
import {
  usersQueries,
  petsQueries,
  followersQueries,
  postsQueries,
} from './queries';
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
    ...postsQueries,
  },
  Mutation: {
    ...usersMutations,
    ...petsMutations,
    ...postsMutations,
    ...followersMutations,
  },
};
