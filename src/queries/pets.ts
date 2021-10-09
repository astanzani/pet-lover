import { idFromTokenUserId } from '@db/utils';
import { getPets, getSuggestedPets } from '@services/pets';
import { ApolloContext } from '@types';

export const petsQueries = {
  pets(_parent: any, _args: any, { userId }: { userId: string }) {
    return getPets(idFromTokenUserId(userId));
  },
  suggestedPets(
    _parent: any,
    { first, cursor }: { first: number; cursor?: string },
    { userId }: ApolloContext
  ) {
    return getSuggestedPets(first, idFromTokenUserId(userId), cursor);
  },
};
