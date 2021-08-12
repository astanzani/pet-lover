import { createUser } from '../services/users';
import { AddUserInput } from '../types';

export const usersMutations = {
  addUser(
    _parent: any,
    { props }: { props: AddUserInput },
    { userId }: { userId: string }
  ) {
    return createUser(props, userId);
  },
};
