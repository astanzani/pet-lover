import { DynamoDB } from 'aws-sdk';

import { Maybe, Post } from '@generated/graphql';
import { PaginatedList } from '@types';
import { decodeCursor, encodeCursor } from './utils';

export async function createOne(input: Post): Promise<Post> {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.DYNAMODB_POSTS_TABLE,
    Item: input,
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return input;
}

export async function readMany(
  keys: { petId: string; postId: string }[]
): Promise<Post[] | null> {
  const params: DynamoDB.DocumentClient.BatchGetItemInput = {
    RequestItems: {
      [process.env.DYNAMODB_POSTS_TABLE]: {
        Keys: keys.map((key) => ({
          petId: key.petId,
          postId: key.postId,
        })),
      },
    },
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.batchGet(params).promise();

  if (result.Responses == null) {
    return null;
  }

  const posts = result.Responses[process.env.DYNAMODB_POSTS_TABLE] as Post[];

  return posts;
}
