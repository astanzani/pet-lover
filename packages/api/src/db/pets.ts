import { Maybe, Pet, UpdatePetInput } from '@generated/graphql';
import { PaginatedList } from '@types';
import { DbExpression, decodeCursor } from './utils';
import { create, get, query, scan, update } from './common';
import { paginate } from './pagination';

interface PetsTableKey {
  petId: string;
  userId: string;
}

export async function createPet(input: Pet): Promise<Pet> {
  const petsTable = process.env.DYNAMODB_PETS_TABLE;
  const pet = await create(petsTable, input);
  return pet;
}

export async function getUserPets(userId: string): Promise<Pet[] | null> {
  const petsTable = process.env.DYNAMODB_PETS_TABLE;
  const pets = await query<Pet>(petsTable, { userId });
  return pets;
}

export async function getPets(keys: PetsTableKey[]): Promise<Pet[] | null> {
  const petsTable = process.env.DYNAMODB_PETS_TABLE;
  const pets = get<Pet>(petsTable, keys);
  return pets;
}

export async function listPets(
  first: number,
  lastCursor?: Maybe<string>,
  filter?: DbExpression
): Promise<PaginatedList<Pet> | null> {
  const petsTable = process.env.DYNAMODB_PETS_TABLE;

  const pets = await scan<Pet>(petsTable, filter);

  return pets
    ? paginate(pets, { hash: 'userId', range: 'petId' }, first, lastCursor)
    : null;
}

export async function updatePet(
  petId: string,
  userId: string,
  attrs: UpdatePetInput
): Promise<Pet | null> {
  const petsTable = process.env.DYNAMODB_PETS_TABLE;
  const key = { userId, petId };
  const result = await update(petsTable, key, attrs);

  if (result == null) {
    return null;
  }

  return get<Pet>(petsTable, key);
}
