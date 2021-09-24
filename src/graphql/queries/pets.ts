import { gql, useQuery } from '@apollo/client';

import { PaginatedList, Pet } from '@types';

export const GET_PETS = gql`
  query GetPets {
    pets {
      userId
      petId
      name
      picture
    }
  }
`;

export function useGetPetsQuery() {
  return useQuery<{ pets: Pet[] }>(GET_PETS);
}

export const GET_SUGGESTED_PETS = gql`
  query GetSuggestedPets($first: Int, $cursor: String) {
    suggestedPets(first: $first, cursor: $cursor) {
      items {
        userId
        petId
        name
        picture
      }
      cursor
    }
  }
`;

export function useGetSuggestedPetsQuery(opts?: {
  variables: { first?: number; cursor?: string };
}) {
  return useQuery<
    { suggestedPets: PaginatedList<Pet> },
    { first?: number; cursor?: string }
  >(GET_SUGGESTED_PETS, { variables: opts?.variables });
}
