import { gql, useMutation } from '@apollo/client';

import { AddPetInput, Pet } from '@types';

export const ADD_PET = gql`
  mutation addPet($props: AddPetInput!) {
    addPet(props: $props) {
      petId
      userId
      name
      picture
    }
  }
`;

export const UPLOAD_PET_PICTURE = gql`
  mutation ($petId: String!, $picture: Upload!) {
    uploadPetProfilePicture(petId: $petId, picture: $picture)
  }
`;

export function useAddPetMutation() {
  return useMutation<{ addPet: Pet; props: AddPetInput }>(ADD_PET);
}
