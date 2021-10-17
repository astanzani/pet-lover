import { Maybe } from '@generated/graphql';
import { PaginatedList } from '@types';
import { DynamoDB } from 'aws-sdk';
import { chunk } from 'lodash';
import { decodeCursor, encodeCursor } from './utils';

// Dynamodb`s batchWrite accepts only up to 25 items per call.
const BATCH_SIZE = 25;

const splitIntoBatchs = (ids: string[]): string[][] => {
  return chunk(ids, BATCH_SIZE);
};

export const createMany = async (
  userIds: string[],
  postId: string,
  petId: string
) => {
  const batches = splitIntoBatchs(userIds);
  const createdAt = new Date().toISOString();

  const allParams: DynamoDB.DocumentClient.BatchWriteItemInput[] = batches.map(
    (batch) => ({
      RequestItems: {
        [process.env.DYNAMODB_FEEDS_TABLE]: batch.map((id) => ({
          PutRequest: {
            Item: {
              userId: id,
              createdAt,
              postId,
              petId,
            },
          },
        })),
      },
    })
  );

  const db = new DynamoDB.DocumentClient();

  const requests = allParams.map((params) => db.batchWrite(params).promise());

  return Promise.all(requests);
};

interface FeedsTableKey {
  userId: string;
  createdAt: string;
}

interface FeedsTableItem {
  userId: string;
  createdAt: string;
  postId: string;
  petId: string;
}

export const query = async (
  userId: string,
  first: number,
  lastCursor?: Maybe<string>
): Promise<PaginatedList<FeedsTableItem> | null> => {
  const startKey = lastCursor
    ? decodeCursor<FeedsTableKey>(lastCursor)
    : undefined;

  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.DYNAMODB_FEEDS_TABLE,
    ExpressionAttributeValues: {
      ':v1': userId,
    },
    KeyConditionExpression: 'userId = :v1',
    ExclusiveStartKey: startKey,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.query(params).promise();

  if (result.Items == null) {
    return null;
  }

  const feedItems = result.Items.slice(0, first) as FeedsTableItem[];
  const lastItem = feedItems[feedItems.length - 1];
  const cursor =
    feedItems.length === first
      ? encodeCursor({ userId: lastItem.userId, createdAt: lastItem.createdAt })
      : undefined;
  const totalFound = result.Count ?? 0;

  return { items: feedItems, cursor, totalFound };
};
