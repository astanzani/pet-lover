import { encodeCursor } from '@db/utils';
import { DynamoDB } from 'aws-sdk';

import { Pet } from '@generated/graphql';
import * as dbOps from '../pets';

describe('Pets DB operations', () => {
  const put = jest.fn();
  const get = jest.fn();
  const query = jest.fn();
  const scan = jest.fn();
  const update = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(DynamoDB, 'DocumentClient')
      .mockReturnValue({ put, get, query, scan, update } as any);
  });
  it('creates a pet on the database', async () => {
    put.mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });

    const pet: Pet = {
      petId: 'PET#1',
      userId: 'USER#1',
      name: 'Pet 1',
    };

    await dbOps.createOne(pet);

    expect(put).toBeCalledWith(
      expect.objectContaining({ Item: expect.objectContaining(pet) })
    );
  });

  it('reads all pets for an user from the database', async () => {
    const ownUserPet1: Pet = {
      petId: 'PET#1',
      userId: 'USER#1',
      name: 'Pet 1',
    };
    const ownUserPet2: Pet = {
      petId: 'PET#2',
      userId: 'USER#1',
      name: 'Pet 2',
    };
    query.mockReturnValue({
      promise: jest
        .fn()
        .mockResolvedValue({ Items: [ownUserPet1, ownUserPet2] }),
    });

    await dbOps.readAll('USER#1');

    expect(query).toHaveBeenCalledWith(
      expect.objectContaining({
        ExpressionAttributeValues: {
          ':v1': 'USER#1',
        },
        KeyConditionExpression: 'userId = :v1',
      })
    );
  });

  it('scans data from db in a paginated manner', async () => {
    const ownUserPet1: Pet = {
      petId: 'PET#1',
      userId: 'USER#1',
      name: 'Pet 1',
    };
    const ownUserPet2: Pet = {
      petId: 'PET#2',
      userId: 'USER#1',
      name: 'Pet 2',
    };
    scan.mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Items: [ownUserPet1, ownUserPet2],
        LastEvaluatedKey: { petId: 'PET#2', userId: 'USER#1' },
      }),
    });

    await dbOps.scan(2);

    expect(scan).toHaveBeenCalled();

    await dbOps.scan(2, encodeCursor({ userId: 'USER#1', petId: 'PET#2' }));

    expect(scan).toHaveBeenCalledWith(
      expect.objectContaining({
        ExclusiveStartKey: { userId: 'USER#1', petId: 'PET#2' },
      })
    );
  });

  it('updates one pet in db', async () => {
    update.mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });

    await dbOps.updateOne('PET#1', 'USER#1', { name: 'New Pet Name' });

    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        Key: { petId: 'PET#1', userId: 'USER#1' },
      })
    );
  });
});
