import { S3 } from 'aws-sdk';
import { FileUpload } from 'graphql-upload';
import { finished, PassThrough } from 'stream';

import { addUser, getUser } from '../db/users';
import { AddUserInput, User } from '../types';

const USER_ID_PREFIX = 'USER#';

export async function getUserProfile(id: string): Promise<User> {
  const user = await getUser(id);

  if (user == null) {
    throw new Error(`Could not find user with id: ${id}`);
  }

  return user;
}

export async function createUser(
  input: AddUserInput,
  id: string
): Promise<User> {
  const user: User = {
    ...input,
    userId: USER_ID_PREFIX + id,
  };

  const addedUser = await addUser(user);

  if (addedUser == null) {
    throw new Error(`Failed to add user: ${JSON.stringify(user)}`);
  }

  return addedUser;
}

export const S3StreamUpload = (Bucket: string, Key: string): PassThrough => {
  const passthrough = new PassThrough();
  const params: S3.Types.PutObjectRequest = {
    Bucket,
    Key,
    Body: passthrough,
    ContentType: 'image/jpeg',
  };
  const s3 = new S3();
  s3.upload(params, (err?: Error) => {
    if (err != null) {
      console.error('S3 upload error:', err);
      passthrough.emit('error', err);
    }
  });
  return passthrough;
};

export async function uploadProfilePicture(
  userId: string,
  baseUrl: string,
  picture: Promise<FileUpload>
) {
  const id = USER_ID_PREFIX + userId;
  const fileNameBase = `PICTURE_${id}`;
  const fileName = `${fileNameBase}.jpg`;
  const s3Url = `${baseUrl}/profile_picture/${fileNameBase}`;

  const { createReadStream } = await picture;

  return new Promise((resolve, reject) => {
    const stream = createReadStream();

    const s3 = new S3();
    s3.upload({
      Bucket: process.env.PROFILE_PICTURES_BUCKET,
      Key: 'MyFile',
      Body: stream,
      ContentType: 'image/jpeg',
    })
      .promise()
      .then((data) => resolve(data.Location))
      .catch((err) => console.error(err));
  });
}
