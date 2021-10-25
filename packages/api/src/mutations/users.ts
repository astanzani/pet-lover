import { FileUpload } from 'graphql-upload';

import { addUser, uploadProfilePicture } from '@services/users';
import { ApolloContext } from '@types';
import { idFromTokenUserId } from '@db/utils';
import { Resolvers } from '@generated/graphql';

export const usersMutations: Resolvers<ApolloContext>['Mutation'] = {
  addUser(_parent, { props }, { userId }) {
    return addUser(props, idFromTokenUserId(userId));
  },
  uploadUserProfilePicture(_parent, { picture }, { userId }: ApolloContext) {
    return uploadProfilePicture(idFromTokenUserId(userId), picture);
  },
};
