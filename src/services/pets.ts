import { v4 } from 'uuid';
import { FileUpload } from 'graphql-upload';

import { AddPetInput, Pet, PaginatedList } from '@types';
import { createOne, readAll, updateOne, scan } from '@db/pets';
import { listAllFollowingRelationships } from '@services/followers';
import { uploadFile } from '@s3';
import { FilterBuilder } from '@db/utils';

const PET_ID_PREFIX = 'PET#';

export async function addPet(input: AddPetInput, userId: string): Promise<Pet> {
  const pet: Pet = {
    ...input,
    userId,
    petId: PET_ID_PREFIX + v4(),
  };

  const addedPet = await createOne(pet);

  if (addedPet == null) {
    throw new Error(`Failed to add user: ${JSON.stringify(pet)}`);
  }

  return addedPet;
}

export async function getPets(userId: string): Promise<Pet[]> {
  const pets = await readAll(userId);

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
  await updateOne(petId, userId, { picture: url });

  return url;
}

export async function getSuggestedPets(
  userId: string,
  first: number,
  cursor?: string
): Promise<PaginatedList<Pet>> {
  const followees = (await listAllFollowingRelationships(userId)).map(
    (r) => r.petId
  );

  let filter = new FilterBuilder().notEqual('userId', userId);

  if (followees.length > 0) {
    filter = filter.and().notIn('petId', followees);
  }

  const pets = await scan(first, cursor, filter.build());

  if (pets == null) {
    throw new Error('Failed to get suggested pets');
  }

  return pets;
}
