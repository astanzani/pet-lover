import faker from 'faker';

import { Pet } from '@generated/graphql';
import * as dbOps from '../pets';
import * as commonOps from '../common';
import { mocked } from 'ts-jest/utils';
import { encodeCursor } from '@db/utils';

const mockedCommonOps = mocked(commonOps, true);

const generatePets = (count: number): Pet[] => {
  let pets: Pet[] = [];

  for (let i = 0; i < count; i++) {
    pets.push({
      petId: 'PET#' + faker.datatype.uuid(),
      userId: 'USER#' + faker.datatype.uuid(),
      name: faker.animal.dog(),
      picture: faker.image.imageUrl(),
    });
  }

  return pets;
};

describe('Pets DB operations', () => {
  beforeEach(() => {
    jest.spyOn(commonOps, 'create').mockResolvedValue({} as any);
    jest.spyOn(commonOps, 'get').mockResolvedValue({} as any);
    jest.spyOn(commonOps, 'query').mockResolvedValue({} as any);
    jest.spyOn(commonOps, 'scan').mockResolvedValue({} as any);
    jest.spyOn(commonOps, 'update').mockResolvedValue({} as any);
  });

  it('creates a pet on the database', async () => {
    const pet: Pet = {
      petId: 'PET#1',
      userId: 'USER#1',
      name: 'Pet 1',
    };

    await dbOps.createPet(pet);

    expect(mockedCommonOps.create).toBeCalledWith(undefined, pet);
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
    mockedCommonOps.query.mockResolvedValue([ownUserPet1, ownUserPet2]);

    const pets = await dbOps.getUserPets('USER#1');

    expect(pets).toHaveLength(2);
  });

  it('lists pets when all items fit page size', async () => {
    const mockedPets = generatePets(8);
    mockedCommonOps.scan.mockResolvedValue(mockedPets);

    const pets = await dbOps.listPets(10);

    expect(pets?.items).toHaveLength(8);
    expect(pets?.items).toEqual(mockedPets);
    expect(pets?.cursor).toBeUndefined();
    expect(pets?.totalFound).toBe(8);
  });

  it('lists pets when all items do not fit page size', async () => {
    const mockedPets = generatePets(15);
    mockedCommonOps.scan.mockResolvedValue(mockedPets);

    const pets = await dbOps.listPets(10);

    expect(pets?.items).toHaveLength(10);
    expect(pets?.items).toEqual(mockedPets.slice(0, 10));
    expect(pets?.cursor).toEqual(
      encodeCursor({ userId: mockedPets[9].userId, petId: mockedPets[9].petId })
    );
    expect(pets?.totalFound).toBe(15);

    mockedCommonOps.scan.mockResolvedValue(mockedPets.slice(10));

    const next = await dbOps.listPets(10, pets?.cursor);

    expect(next?.items).toHaveLength(5);
    expect(next?.items).toEqual(mockedPets.slice(10));
    expect(next?.cursor).toBeUndefined();
    // Total found will not work when not starting from beginning
    expect(next?.totalFound).toBe(15);
  });

  // it('scans data from db in a paginated manner', async () => {
  //   const ownUserPet1: Pet = {
  //     petId: 'PET#1',
  //     userId: 'USER#1',
  //     name: 'Pet 1',
  //   };
  //   const ownUserPet2: Pet = {
  //     petId: 'PET#2',
  //     userId: 'USER#1',
  //     name: 'Pet 2',
  //   };
  //   scan.mockReturnValue({
  //     promise: jest.fn().mockResolvedValue({
  //       Items: [ownUserPet1, ownUserPet2],
  //       LastEvaluatedKey: { petId: 'PET#2', userId: 'USER#1' },
  //     }),
  //   });

  //   await dbOps.scan(2);

  //   expect(scan).toHaveBeenCalled();

  //   await dbOps.scan(2, encodeCursor({ userId: 'USER#1', petId: 'PET#2' }));

  //   expect(scan).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       ExclusiveStartKey: { userId: 'USER#1', petId: 'PET#2' },
  //     })
  //   );
  // });

  // it('updates one pet in db', async () => {
  //   update.mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });

  //   await dbOps.updatePet('PET#1', 'USER#1', { name: 'New Pet Name' });

  //   expect(update).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       Key: { petId: 'PET#1', userId: 'USER#1' },
  //     })
  //   );
  // });
});
