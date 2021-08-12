import { DynamoDB } from 'aws-sdk';
import { User } from '../types';

const KEY_PREFIX = 'USER#';

export async function getUser(id: string): Promise<User | null> {
  const params = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    Key: { userId: KEY_PREFIX + id },
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.get(params).promise();

  return (result.Item as User) ?? null;
}

export async function addUser(input: User): Promise<User> {
  const params = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    Item: input,
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return input;
}
