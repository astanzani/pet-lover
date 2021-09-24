import { DynamoDB } from 'aws-sdk';

import { Pet, UpdatePetInput, PaginatedList } from '@types';

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
  lastCursor?: string
): Promise<PaginatedList<Pet> | null> {
  const startKey = lastCursor
    ? (JSON.parse(lastCursor) as DynamoDB.Key)
    : undefined;

  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: process.env.DYNAMODB_PETS_TABLE,
    Limit: first,
    ExclusiveStartKey: startKey,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.scan(params).promise();

  if (!result.Items || result.Items.length === 0) {
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
  if (attrs.name == null && attrs.picture == null) {
    return;
  }

  let updateExpr = 'SET ';
  let attrValues: { [key: string]: string } = {};

  for (const [key, val] of Object.entries(attrs)) {
    updateExpr += `${key} = :${key}, `;
    attrValues[`:${key}`] = val;
  }

  // Remove trailing comma and space
  updateExpr = updateExpr.slice(0, updateExpr.length - 2);

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    Key: { petId: petId, userId: userId },
    TableName: process.env.DYNAMODB_PETS_TABLE,
    ExpressionAttributeValues: attrValues,
    UpdateExpression: updateExpr,
  };

  const db = new DynamoDB.DocumentClient();
  await db.update(params).promise();
}
