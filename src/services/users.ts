import { S3 } from 'aws-sdk';
import { FileUpload } from 'graphql-upload';

import { uploadFile } from '@s3';
import { createOne, readOne } from '@db/users';
import { AddUserInput, User } from '@types';

const USER_ID_PREFIX = 'USER#';

export async function getUserProfile(id: string): Promise<User> {
  const user = await readOne(id);

  if (user == null) {
    throw new Error(`Could not find user with id: ${id}`);
  }

  return user;
}

export async function addUser(input: AddUserInput, id: string): Promise<User> {
  const user: User = {
    ...input,
    userId: USER_ID_PREFIX + id,
  };

  const addedUser = await createOne(user);

  return addedUser;
}

export async function uploadProfilePicture(
  userId: string,
  picture: Promise<FileUpload>
) {
  const fileName = `users/${userId}.jpg`;

  const { createReadStream } = await picture;

  return uploadFile(
    process.env.PROFILE_PICTURES_BUCKET,
    fileName,
    createReadStream(),
    'image/jpeg'
  );
}
