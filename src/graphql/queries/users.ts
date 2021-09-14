import { gql, useQuery } from '@apollo/client';

import { User } from '@types';

const GET_ME = gql`
  query Me {
    me {
      userId
      name
      email
    }
  }
`;

export function useGetMeQuery() {
  return useQuery<{ me: User }>(GET_ME);
}
