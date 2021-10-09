import { DynamoDB } from 'aws-sdk';
import { isEmpty } from 'lodash';

import { Pet, UpdatePetInput, PaginatedList } from '@types';
import {
  buildUpdateExpression,
  DbExpression,
  encodeCursor,
  decodeCursor,
} from './utils';

export async function createOne(input: Pet): Promise<Pet> {
  const params = {
    TableName: process.env.DYNAMODB_PETS_TABLE,
    Item: input,
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return input;
}

export async function readAll(userId: string): Promise<Pet[] | null> {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.DYNAMODB_PETS_TABLE,
    ExpressionAttributeValues: {
      ':v1': userId,
    },
    KeyConditionExpression: 'userId = :v1',
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.query(params).promise();

  return (result.Items as Pet[]) ?? null;
}

export async function scan(
  first: number,
  lastCursor?: string,
  filter?: DbExpression
): Promise<PaginatedList<Pet> | null> {
  const startKey = lastCursor ? decodeCursor(lastCursor) : undefined;

  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: process.env.DYNAMODB_PETS_TABLE,
    Limit: first,
    ExclusiveStartKey: startKey,
    FilterExpression: filter?.expression,
    ExpressionAttributeValues: filter?.values,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.scan(params).promise();

  if (!result.Items) {
    return null;
  }

  const pets = result.Items as Pet[];
  const cursor = result.LastEvaluatedKey
    ? encodeCursor(result.LastEvaluatedKey)
    : undefined;

  return { items: pets, cursor };
}

export async function updateOne(
  petId: string,
  userId: string,
  attrs: UpdatePetInput
) {
  if (isEmpty(attrs)) {
    return;
  }

  const { expression, values } = buildUpdateExpression(attrs);

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    Key: { petId: petId, userId: userId },
    TableName: process.env.DYNAMODB_PETS_TABLE,
    UpdateExpression: expression,
    ExpressionAttributeValues: values,
  };

  const db = new DynamoDB.DocumentClient();
  await db.update(params).promise();
}
