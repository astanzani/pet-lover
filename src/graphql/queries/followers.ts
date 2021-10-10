import { gql, useQuery, QueryHookOptions } from '@apollo/client';

import { PaginatedList, Pet } from '@types';

export const GET_FOLLOWEES = gql`
  query GetFollowees($first: Int, $cursor: String) {
    followees(first: $first, cursor: $cursor) {
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

export function useGetFolloweesQuery(
  opts?: QueryHookOptions<
    { followees: PaginatedList<Pet> },
    { first?: number; cursor?: string }
  >
) {
  return useQuery<
    { followees: PaginatedList<Pet> },
    { first?: number; cursor?: string }
  >(GET_FOLLOWEES, opts);
}
