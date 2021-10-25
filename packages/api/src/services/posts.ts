import { v4 } from 'uuid';
import { FileUpload } from 'graphql-upload';

import { createOne } from '@db/posts';
import { uploadFile } from '@s3';
import { listFollowedRelationships } from '@services/followers';
import { addPostToFeeds } from '@services/feed';
import { AddPostInput, Post } from '@generated/graphql';

const POST_ID_PREFIX = 'POST#';

async function uploadPostPictures(
  postId: string,
  pics: Array<Promise<FileUpload>>
) {
  return Promise.all(
    pics.map(async (pic, index) => {
      const fileName = `posts/${postId}_${index}.png`;
      const { createReadStream } = await pic;

      return uploadFile(
        process.env.POSTS_PICTURES_BUCKET,
        fileName,
        createReadStream(),
        'image/jpeg'
      );
    })
  );
}

export async function addPost(
  input: AddPostInput,
  userId: string
): Promise<Post> {
  const postId = POST_ID_PREFIX + v4();
  const pics = input.pictures;

  const picsUrls = pics ? await uploadPostPictures(postId, pics) : undefined;

  const post: Post = {
    postId,
    petId: input.petId,
    userId,
    text: input.text,
    pictures: picsUrls,
    createdAt: new Date().toISOString(),
  };

  const addedPost = await createOne(post);

  const followers = await listFollowedRelationships(input.petId, 10000);

  await addPostToFeeds(
    followers.items.map((follower) => follower.userId),
    addedPost
  );

  return addedPost;
}
