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

interface PetsTableKey {
  petId: string;
}

export async function readMany(
  petIds: string[],
  first: number,
  lastCursor?: string
): Promise<PaginatedList<Pet> | null> {
  const ids = petIds.sort();
  const startKey = lastCursor
    ? decodeCursor<PetsTableKey>(lastCursor)
    : undefined;

  const startFromIndex = ids.findIndex((id) => id === startKey?.petId);

  const idsToFetch =
    startFromIndex !== -1
      ? ids.slice(startFromIndex + 1, startFromIndex + 1 + first)
      : ids.slice(0, first);

  const params: DynamoDB.DocumentClient.BatchGetItemInput = {
    RequestItems: {
      [process.env.DYNAMODB_PETS_TABLE]: {
        Keys: idsToFetch.map((petId) => ({
          petId,
        })),
      },
    },
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.batchGet(params).promise();

  const lastFetchedId = idsToFetch[idsToFetch.length - 1];
  const cursor =
    lastFetchedId !== ids[length - 1]
      ? encodeCursor({ petId: lastFetchedId })
      : undefined;
  const totalFound = petIds.length;

  const pets = result.Responses![process.env.DYNAMODB_PETS_TABLE] as Pet[];

  return { items: pets, cursor, totalFound };
}

export async function scan(
  first: number,
  lastCursor?: string,
  filter?: DbExpression
): Promise<PaginatedList<Pet> | null> {
  const startKey = lastCursor
    ? decodeCursor<PetsTableKey>(lastCursor)
    : undefined;

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
  const totalFound = result.Count ?? 0;

  return { items: pets, cursor, totalFound };
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
