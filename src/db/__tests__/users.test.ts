import { DynamoDB } from 'aws-sdk';

import { User } from '@generated/graphql';
import * as dbOps from '../users';

describe('Users DB operations', () => {
  const put = jest.fn();
  const get = jest.fn();

  beforeEach(() => {
    jest.spyOn(DynamoDB, 'DocumentClient').mockReturnValue({ put, get } as any);
  });
  it('creates an user on the database', async () => {
    put.mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });

    const user: User = {
      userId: 'USER#1',
      name: 'User 1',
      email: 'user1@email.com',
    };

    await dbOps.createOne(user);

    expect(put).toBeCalledWith(
      expect.objectContaining({ Item: expect.objectContaining(user) })
    );
  });

  it('reads an user from the database', async () => {
    const user: User = {
      userId: 'USER#1',
      name: 'User 1',
      email: 'user1@email.com',
    };

    get.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Item: user }),
    });

    const expected = await dbOps.readOne('USER#1');

    expect(expected).toEqual(user);
  });

  it('returns null if no user found', async () => {
    get.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Item: undefined }),
    });

    const expected = await dbOps.readOne('USER#1');

    expect(expected).toBeNull();
  });
});
