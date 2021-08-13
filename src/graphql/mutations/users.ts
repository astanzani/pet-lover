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
