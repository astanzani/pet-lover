import { DynamoDB } from 'aws-sdk';

import { Pet } from '@types';
import * as dbOps from '../pets';

describe('Pets DB operations', () => {
  const put = jest.fn();
  const get = jest.fn();

  beforeEach(() => {
    jest.spyOn(DynamoDB, 'DocumentClient').mockReturnValue({ put, get } as any);
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
});
