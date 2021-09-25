import { v4 } from 'uuid';
import { FileUpload } from 'graphql-upload';

import { AddPetInput, Pet, PaginatedList } from '@types';
import { createOne, readAll, updateOne, scan } from '@db/pets';
import { uploadFile } from '@s3';

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

export async function getPets(userId: string): Promise<Pet[]> {
  const id = USER_ID_PREFIX + userId;
  const pets = await readAll(id);

  if (pets == null) {
    throw new Error(`Failed to get pets for user with id: ${userId}`);
  }

  return pets;
}

export async function uploadProfilePicture(
  petId: string,
  userId: string,
  picture: Promise<FileUpload>
) {
  const fileName = `pets/${petId}.jpg`;

  const { createReadStream } = await picture;

  // Upload file to S3
  const url = await uploadFile(
    process.env.PROFILE_PICTURES_BUCKET,
    fileName,
    createReadStream(),
    'image/jpeg'
  );

  // Update pet on DB with the url
  await updateOne(petId, USER_ID_PREFIX + userId, { picture: url });

  return url;
}

export async function getSuggestedPets(
  first: number,
  userId: string,
  cursor?: string
): Promise<PaginatedList<Pet>> {
  const pets = await scan(first, cursor, [
    { field: 'userId', value: USER_ID_PREFIX + userId, op: '<>' },
  ]);

  if (pets == null) {
    throw new Error('Failed to get suggested pets');
  }

  return pets;
}
