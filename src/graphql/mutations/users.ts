import { gql, useMutation } from '@apollo/client';
import { AddUserInput, User } from '@types';

export const ADD_USER = gql`
  mutation addUser($props: AddUserInput!) {
    addUser(props: $props) {
      userId
      name
      email
    }
  }
`;

export const UPLOAD_PICTURE = gql`
  mutation ($picture: Upload!) {
    uploadUserProfilePicture(picture: $picture)
  }
`;

export function useAddUserMutation() {
  return useMutation<{ addUser: User; props: AddUserInput }>(ADD_USER);
}
