import * as service from '../users';
import * as db from '@db/users';
import { User } from '@generated/graphql';

describe('Users service', () => {
  it('gets an user profile', async () => {
    const user: User = {
      userId: 'USER#1',
      name: 'User 1',
      email: 'user1@email.com',
    };

    jest.spyOn(db, 'readOne').mockResolvedValue(user);

    const result = await service.getUserProfile('USER#1');

    expect(result).toEqual(user);
  });

  it('throws if user not found', async () => {
    jest.spyOn(db, 'readOne').mockResolvedValue(null);

    await expect(service.getUserProfile('USER#1')).rejects.toThrow();
  });

  it('adds user', async () => {
    const user: User = {
      userId: 'USER#1',
      name: 'User 1',
      email: 'user1@email.com',
    };

    jest.spyOn(db, 'createOne').mockResolvedValue(user);

    await service.addUser({ name: 'User 1', email: 'user1@email.com' }, '1');

    expect(db.createOne).toBeCalledWith(expect.objectContaining(user));
  });
});
