import { FileUpload } from 'graphql-upload';

import { addPet, uploadProfilePicture } from '@services/pets';
import { AddPetInput, ApolloContext } from '@types';
import { idFromTokenUserId } from '@db/utils';

export const petsMutations = {
  addPet(
    _parent: any,
    { props }: { props: AddPetInput },
    { userId }: ApolloContext
  ) {
    return addPet(props, idFromTokenUserId(userId));
  },
  uploadPetProfilePicture(
    _parent: any,
    { petId, picture }: { petId: string; picture: Promise<FileUpload> },
    { userId }: ApolloContext
  ) {
    return uploadProfilePicture(petId, idFromTokenUserId(userId), picture);
  },
};
