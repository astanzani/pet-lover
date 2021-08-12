import { getUserProfile } from '../services/users';

export const usersQueries = {
  me(_parent: any, _args: any, { userId }: { userId: string }) {
    return getUserProfile(userId);
  },
};
