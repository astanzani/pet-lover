import { Maybe } from '@generated/graphql';
import { DynamoDB } from 'aws-sdk';
import { isEmpty } from 'lodash';

import { Pet, UpdatePetInput } from '@generated/graphql';
import { PaginatedList } from '@types';
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
  keys: { petId: string; userId: string }[],
  first: number,
  lastCursor?: Maybe<string>
): Promise<PaginatedList<Pet> | null> {
  const sortedKeys = keys.sort((a, b) => a.petId.localeCompare(b.petId));
  const startKey = lastCursor
    ? decodeCursor<PetsTableKey>(lastCursor)
    : undefined;

  const startFromIndex = sortedKeys.findIndex(
    (key) => key.petId === startKey?.petId
  );

  const keysToFetch =
    startFromIndex !== -1
      ? sortedKeys.slice(startFromIndex + 1, startFromIndex + 1 + first)
      : sortedKeys.slice(0, first);

  const params: DynamoDB.DocumentClient.BatchGetItemInput = {
    RequestItems: {
      [process.env.DYNAMODB_PETS_TABLE]: {
        Keys: keysToFetch.map((key) => ({
          userId: key.userId,
          petId: key.petId,
        })),
      },
    },
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.batchGet(params).promise();

  const lastFetchedId = keysToFetch[keysToFetch.length - 1];
  const cursor =
    lastFetchedId.petId !== sortedKeys[sortedKeys.length - 1].petId
      ? encodeCursor({
          petId: lastFetchedId.petId,
          userId: lastFetchedId.userId,
        })
      : undefined;
  const totalFound = keys.length;

  const pets = result.Responses![process.env.DYNAMODB_PETS_TABLE] as Pet[];

  return { items: pets, cursor, totalFound };
}

export async function scan(
  first: number,
  lastCursor?: Maybe<string>,
  filter?: DbExpression
): Promise<PaginatedList<Pet> | null> {
  const startKey = lastCursor
    ? decodeCursor<PetsTableKey>(lastCursor)
    : undefined;

  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: process.env.DYNAMODB_PETS_TABLE,
    ExclusiveStartKey: startKey,
    FilterExpression: filter?.expression,
    ExpressionAttributeValues: filter?.values,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.scan(params).promise();

  if (!result.Items) {
    return null;
  }

  const pets = result.Items.slice(0, first) as Pet[];
  const lastPet = result.Items[result.Items.length - 1];
  const cursor =
    pets.length === first
      ? encodeCursor({ userId: lastPet.userId, petId: lastPet.petId })
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
