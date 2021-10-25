import { User } from '@generated/graphql';
import { create, get } from './common';

export async function getUser(id: string): Promise<User | null> {
  const usersTable = process.env.DYNAMODB_USERS_TABLE;
  const user = await get<User>(usersTable, {
    userId: id,
  });
  return user;
}

export async function createUser(input: User): Promise<User> {
  const usersTable = process.env.DYNAMODB_USERS_TABLE;
  const user = await create(usersTable, input);
  return user;
}
