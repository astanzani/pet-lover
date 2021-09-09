import { DynamoDB } from 'aws-sdk';

import { Post } from '@types';

export async function createOne(input: Post): Promise<Post> {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.DYNAMODB_POSTS_TABLE,
    Item: input,
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return input;
}
