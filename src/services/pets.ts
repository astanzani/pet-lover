import { v4 } from 'uuid';
import { FileUpload } from 'graphql-upload';

import { AddPetInput, Pet, PaginatedPets } from '@generated/graphql';
import { createPet, getUserPets, updatePet, listPets } from '@db/pets';
import { listFollowingRelationships } from '@services/followers';
import { uploadFile } from '@s3';
import { FilterBuilder } from '@db/utils';
import { Maybe } from '@generated/graphql';

const PET_ID_PREFIX = 'PET#';

export async function addPet(input: AddPetInput, userId: string): Promise<Pet> {
  const pet: Pet = {
    ...input,
    userId,
    petId: PET_ID_PREFIX + v4(),
  };

  const addedPet = await createPet(pet);

  if (addedPet == null) {
    throw new Error(`Failed to add user: ${JSON.stringify(pet)}`);
  }

  return addedPet;
}

export async function getPets(userId: string): Promise<Pet[]> {
  const pets = await getUserPets(userId);

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
  await updatePet(petId, userId, { picture: url });

  return url;
}

export async function getSuggestedPets(
  userId: string,
  first: number,
  cursor?: Maybe<string>
): Promise<PaginatedPets> {
  const followees = (await listFollowingRelationships(userId, 10000)).items.map(
    (r) => r.petId
  );

  let filter = new FilterBuilder().notEqual('userId', userId);

  if (followees.length > 0) {
    filter = filter.and().notIn('petId', followees);
  }

  const pets = await listPets(first, cursor, filter.build());

  if (pets == null) {
    throw new Error('Failed to get suggested pets');
  }

  return pets;
}
