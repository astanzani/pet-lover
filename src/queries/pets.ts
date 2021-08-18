import { getPets } from '@services/pets';

export const petsQueries = {
  pets(_parent: any, _args: any, { userId }: { userId: string }) {
    return getPets(userId);
  },
};
