import { DynamoDB } from 'aws-sdk';

import { User } from '@types';

export async function readOne(id: string): Promise<User | null> {
  const params = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    Key: { userId: id },
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.get(params).promise();

  return (result.Item as User) ?? null;
}

export async function createOne(input: User): Promise<User> {
  const params = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    Item: input,
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return input;
}
