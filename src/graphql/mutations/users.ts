import { gql } from '@apollo/client';

export const SAVE_USER = gql`
  mutation saveUser($props: AddUserInput!) {
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
