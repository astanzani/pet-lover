import { DynamoDB } from 'aws-sdk';
import { chunk, isArray, isEmpty } from 'lodash';
import { buildUpdateExpression, DbExpression } from './utils';

async function getOne<T>(
  tableName: string,
  key: DynamoDB.DocumentClient.Key
): Promise<T | null> {
  const params = {
    TableName: tableName,
    Key: key,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.get(params).promise();

  return (result.Item as T) ?? null;
}

// Max 100 items
async function getMany<T>(
  tableName: string,
  keys: DynamoDB.DocumentClient.Key[]
): Promise<T[] | null> {
  const params: DynamoDB.DocumentClient.BatchGetItemInput = {
    RequestItems: {
      [tableName]: {
        Keys: keys,
      },
    },
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.batchGet(params).promise();

  if (result.Responses == null) {
    return null;
  }

  return result.Responses[tableName] as T[];
}

async function get<T>(
  tableName: string,
  keys: DynamoDB.DocumentClient.Key[]
): Promise<T[] | null>;
async function get<T>(
  tableName: string,
  key: DynamoDB.DocumentClient.Key
): Promise<T | null>;
async function get<T>(
  tableName: string,
  keyOrKeys: DynamoDB.DocumentClient.Key | DynamoDB.DocumentClient.Key[]
): Promise<(T | null) | (T[] | null)> {
  if (!Array.isArray(keyOrKeys)) {
    return getOne<T>(tableName, keyOrKeys);
  }

  return getMany<T>(tableName, keyOrKeys);
}

async function createOne<T>(tableName: string, item: T): Promise<T> {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: item,
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return item;
}

async function createMany<T>(tableName: string, items: T[]): Promise<T[]> {
  const BATCH_SIZE = 25;

  const batches = chunk(items, BATCH_SIZE);

  const params: DynamoDB.DocumentClient.BatchWriteItemInput[] = batches.map(
    (batch) => ({
      RequestItems: {
        [tableName]: batch.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    })
  );

  const db = new DynamoDB.DocumentClient();
  const requests = params.map((param) => db.batchWrite(param).promise());

  await Promise.all(requests);

  return items;
}

async function create<T>(tableName: string, item: T): Promise<T>;
async function create<T>(tableName: string, items: T[]): Promise<T[]>;
async function create<T>(
  tableName: string,
  itemOrItems: T | T[]
): Promise<T | T[]> {
  if (!isArray(itemOrItems)) {
    return createOne(tableName, itemOrItems);
  }

  return createMany(tableName, itemOrItems);
}

async function query<T>(
  tableName: string,
  hashKey: DynamoDB.DocumentClient.Key,
  invertedIndex = false,
  sortDescending = false
): Promise<Array<T> | null> {
  const keyField = Object.keys(hashKey)[0];
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditionExpression: `${keyField} = :v1`,
    ExpressionAttributeValues: {
      ':v1': hashKey[keyField],
    },
    IndexName: invertedIndex ? 'inverted-index' : undefined,
    ScanIndexForward: !sortDescending,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.query(params).promise();

  if (result.Items == null) {
    return null;
  }

  return result.Items as Array<T>;
}

async function scan<T>(
  tableName: string,
  filter?: DbExpression
): Promise<Array<T> | null> {
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
    FilterExpression: filter?.expression,
    ExpressionAttributeValues: filter?.values,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.scan(params).promise();

  if (!result.Items) {
    return null;
  }

  return result.Items as Array<T>;
}

async function update<T extends { [key: string]: unknown }>(
  tableName: string,
  key: DynamoDB.DocumentClient.Key,
  data: T
): Promise<T | null> {
  if (isEmpty(data)) {
    return null;
  }

  const { expression, values } = buildUpdateExpression(data);

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    Key: key,
    TableName: tableName,
    UpdateExpression: expression,
    ExpressionAttributeValues: values,
  };

  const db = new DynamoDB.DocumentClient();
  await db.update(params).promise();

  return data;
}

async function remove(
  tableName: string,
  key: DynamoDB.DocumentClient.Key
): Promise<DynamoDB.DocumentClient.Key> {
  const params = {
    TableName: tableName,
    Key: key,
  };

  const db = new DynamoDB.DocumentClient();
  await db.delete(params).promise();

  return key;
}

export { create, get, query, remove, scan, update };
