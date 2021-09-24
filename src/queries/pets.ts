import { getPets, getSuggestedPets } from '@services/pets';

export const petsQueries = {
  pets(_parent: any, _args: any, { userId }: { userId: string }) {
    return getPets(userId);
  },
  suggestedPets(
    _parent: any,
    { first, cursor }: { first: number; cursor?: string }
  ) {
    return getSuggestedPets(first, cursor);
  },
};
