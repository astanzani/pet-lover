import { DynamoDB } from 'aws-sdk';

import { Friendship } from '@types';

export const createOne = async (input: Friendship): Promise<Friendship> => {
  const params = {
    TableName: process.env.DYNAMODB_FRIENDSHIPS_TABLE,
    Item: {
      petId: input.petId,
      friendId: input.friendId,
    },
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return input;
};

export const deleteOne = async (input: Friendship): Promise<Friendship> => {
  const params = {
    TableName: process.env.DYNAMODB_FRIENDSHIPS_TABLE,
    Key: {
      petId: input.petId,
      friendId: input.friendId,
    },
  };

  const db = new DynamoDB.DocumentClient();
  await db.delete(params).promise();

  return input;
};
