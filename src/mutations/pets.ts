import { FileUpload } from 'graphql-upload';

import { addPet, uploadProfilePicture } from '@services/pets';
import { ApolloContext } from '@types';
import { idFromTokenUserId } from '@db/utils';
import { Resolvers } from '@generated/graphql';

export const petsMutations: Resolvers<ApolloContext>['Mutation'] = {
  addPet(_parent, { props }, { userId }) {
    return addPet(props, idFromTokenUserId(userId));
  },
  uploadPetProfilePicture(
    _parent,
    { petId, picture }: { petId: string; picture: Promise<FileUpload> },
    { userId }: ApolloContext
  ) {
    return uploadProfilePicture(petId, idFromTokenUserId(userId), picture);
  },
};
