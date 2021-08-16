import { createUser, uploadProfilePicture } from '../services/users';
import { AddUserInput } from '../types';

interface ApolloContext {
  userId: string;
  baseUrl: string;
}

export const usersMutations = {
  addUser(
    _parent: any,
    { props }: { props: AddUserInput },
    { userId }: { userId: string }
  ) {
    return createUser(props, userId);
  },
  uploadPicture(
    _parent: any,
    { picture }: { picture: any },
    { userId, baseUrl }: ApolloContext
  ) {
    return uploadProfilePicture(userId, baseUrl, picture);
  },
};
