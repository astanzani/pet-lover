import { gql } from '@apollo/client';

export const SAVE_PET = gql`
  mutation savePet($props: AddPetInput!) {
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
