import { FileUpload } from 'graphql-upload';

import { addUser, uploadProfilePicture } from '@services/users';
import { AddUserInput, ApolloContext } from '@types';

export const usersMutations = {
  addUser(
    _parent: any,
    { props }: { props: AddUserInput },
    { userId }: { userId: string }
  ) {
    return addUser(props, userId);
  },
  uploadUserProfilePicture(
    _parent: any,
    { picture }: { picture: Promise<FileUpload> },
    { userId }: ApolloContext
  ) {
    return uploadProfilePicture(userId, picture);
  },
};
