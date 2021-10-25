import { idFromTokenUserId } from '@db/utils';
import { Resolvers } from '@generated/graphql';
import { getPets, getSuggestedPets } from '@services/pets';
import { ApolloContext } from '@types';

export const petsQueries: Resolvers<ApolloContext>['Query'] = {
  pets(_parent, _args, { userId }) {
    return getPets(idFromTokenUserId(userId));
  },
  suggestedPets(_parent, { first, cursor }, { userId }) {
    return getSuggestedPets(idFromTokenUserId(userId), first, cursor);
  },
};
