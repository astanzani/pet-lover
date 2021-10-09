import { FileUpload } from 'graphql-upload';

import { addUser, uploadProfilePicture } from '@services/users';
import { AddUserInput, ApolloContext } from '@types';
import { idFromTokenUserId } from '@db/utils';

export const usersMutations = {
  addUser(
    _parent: any,
    { props }: { props: AddUserInput },
    { userId }: { userId: string }
  ) {
    return addUser(props, idFromTokenUserId(userId));
  },
  uploadUserProfilePicture(
    _parent: any,
    { picture }: { picture: Promise<FileUpload> },
    { userId }: ApolloContext
  ) {
    return uploadProfilePicture(idFromTokenUserId(userId), picture);
  },
};
