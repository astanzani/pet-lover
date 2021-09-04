import { gql } from '@apollo/client';

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
