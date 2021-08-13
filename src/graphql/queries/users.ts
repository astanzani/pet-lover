import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      userId
      name
      email
    }
  }
`;
