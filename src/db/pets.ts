import { DynamoDB } from 'aws-sdk';
import { isEmpty } from 'lodash';

import { Pet, UpdatePetInput, PaginatedList } from '@types';
import { buildFilterExpression, buildUpateExpression } from './utils';

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

interface Filter {
  field: keyof Pet;
  value: string;
  op: '=' | '<>' | '<' | '<=' | '>' | '>=';
}

export async function scan(
  first: number,
  lastCursor?: string,
  filters?: Filter[]
): Promise<PaginatedList<Pet> | null> {
  const startKey = lastCursor
    ? (JSON.parse(lastCursor) as DynamoDB.Key)
    : undefined;

  const filterExpression = filters ? buildFilterExpression(filters) : undefined;

  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: process.env.DYNAMODB_PETS_TABLE,
    Limit: first,
    ExclusiveStartKey: startKey,
    FilterExpression: filterExpression?.expression,
    ExpressionAttributeValues: filterExpression?.values,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.scan(params).promise();

  if (!result.Items) {
    return null;
  }

  const pets = result.Items as Pet[];
  const cursor = result.LastEvaluatedKey
    ? JSON.stringify(result.LastEvaluatedKey)
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

  const { expression, values } = buildUpateExpression(attrs);

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    Key: { petId: petId, userId: userId },
    TableName: process.env.DYNAMODB_PETS_TABLE,
    UpdateExpression: expression,
    ExpressionAttributeValues: values,
  };

  const db = new DynamoDB.DocumentClient();
  await db.update(params).promise();
}
