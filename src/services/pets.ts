import { v4 } from 'uuid';

import { AddPetInput, Pet } from '@types';
import { createOne } from '@db/pets';

const PET_ID_PREFIX = 'PET#';
const USER_ID_PREFIX = 'USER#';

export async function addPet(input: AddPetInput, userId: string): Promise<Pet> {
  const pet: Pet = {
    ...input,
    userId: USER_ID_PREFIX + userId,
    petId: PET_ID_PREFIX + v4(),
  };

  const addedPet = await createOne(pet);

  if (addedPet == null) {
    throw new Error(`Failed to add user: ${JSON.stringify(pet)}`);
  }

  return addedPet;
}
