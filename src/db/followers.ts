import { DynamoDB } from 'aws-sdk';

import { FollowingRelationship } from '@types';

export const createOne = async (
  input: FollowingRelationship
): Promise<FollowingRelationship> => {
  const params = {
    TableName: process.env.DYNAMODB_FOLLOWERS_TABLE,
    Item: {
      userId: input.userId,
      petId: input.petId,
      ownerId: input.ownerId,
    },
  };

  const db = new DynamoDB.DocumentClient();
  await db.put(params).promise();

  return input;
};

export const deleteOne = async (
  input: FollowingRelationship
): Promise<FollowingRelationship> => {
  const params = {
    TableName: process.env.DYNAMODB_FOLLOWERS_TABLE,
    Key: {
      userId: input.userId,
      petId: input.petId,
    },
  };

  const db = new DynamoDB.DocumentClient();
  await db.delete(params).promise();

  return input;
};

export async function readAll(
  id: string,
  invertedIndex = false
): Promise<FollowingRelationship[] | null> {
  const keyName = invertedIndex ? 'petId' : 'userId';

  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.DYNAMODB_FOLLOWERS_TABLE,
    KeyConditionExpression: `${keyName} = :v1`,
    ExpressionAttributeValues: {
      ':v1': id,
    },
    IndexName: invertedIndex ? 'inverted-index' : undefined,
  };

  const db = new DynamoDB.DocumentClient();
  const result = await db.query(params).promise();

  return (result.Items as FollowingRelationship[]) ?? null;
}
