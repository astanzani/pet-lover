import { DynamoDB } from 'aws-sdk';

import { Pet } from '@types';

export async function createOne(input: Pet): Promise<Pet> {
  const params = {
    TableName: process.env.DYNAMODB_PETS_TABLE,
    Item: input,
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return input;
}
