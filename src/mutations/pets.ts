import { FileUpload } from 'graphql-upload';

import { addPet, uploadProfilePicture } from '@services/pets';
import { AddPetInput, ApolloContext } from '@types';

export const petsMutations = {
  addPet(
    _parent: any,
    { props }: { props: AddPetInput },
    { userId }: ApolloContext
  ) {
    return addPet(props, userId);
  },
  uploadPetProfilePicture(
    _parent: any,
    { petId, picture }: { petId: string; picture: Promise<FileUpload> },
    { userId }: ApolloContext
  ) {
    return uploadProfilePicture(petId, userId, picture);
  },
};
