import { createPet } from '@services/pets';
import { AddPetInput, ApolloContext } from '@types';

export const petsMutations = {
  addPet(
    _parent: any,
    { props }: { props: AddPetInput },
    { userId }: ApolloContext
  ) {
    return createPet(props, userId);
  },
};
