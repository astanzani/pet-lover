import { addUser, getUser } from '../db/users';
import { AddUserInput, User } from '../types';

const USER_ID_PREFIX = 'USER#';

export async function getUserProfile(id: string): Promise<User> {
  const user = await getUser(id);

  if (user == null) {
    throw new Error(`Could not find user with id: ${id}`);
  }

  return user;
}

export async function createUser(
  input: AddUserInput,
  id: string
): Promise<User> {
  const user: User = {
    ...input,
    userId: USER_ID_PREFIX + id,
  };

  const addedUser = await addUser(user);

  if (addedUser == null) {
    throw new Error(`Failed to add user: ${JSON.stringify(user)}`);
  }

  return addedUser;
}
