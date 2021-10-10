import { DynamoDB } from 'aws-sdk';
import { chunk } from 'lodash';

// Dynamodb`s batchWrite accepts only up to 25 items per call.
const BATCH_SIZE = 25;

const splitIntoBatchs = (ids: string[]): string[][] => {
  return chunk(ids, BATCH_SIZE);
};

export const createMany = async (userIds: string[], postId: string) => {
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
