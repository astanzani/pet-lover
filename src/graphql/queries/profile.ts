import { gql, useQuery, QueryHookOptions } from '@apollo/client';

import { PaginatedList, Pet, User } from '@types';

export const GET_PROFILE = gql`
  query GetProfile($firstFollowees: Int, $cursor: String) {
    me {
      userId
      name
      email
    }
    followees(first: $firstFollowees, cursor: $cursor) {
      items {
        userId
        petId
        name
        picture
      }
      cursor
      totalFound
    }
  }
`;

export function useGetProfileQuery(
  opts?: QueryHookOptions<
    { followees: PaginatedList<Pet>; me: User },
    { firstFollowees?: number; cursor?: string }
  >
) {
  return useQuery<
    { followees: PaginatedList<Pet>; me: User },
    { firstFollowees?: number; cursor?: string }
  >(GET_PROFILE, opts);
}
