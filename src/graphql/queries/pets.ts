import { gql, useQuery } from '@apollo/client';

import { Pet } from '@types';

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
