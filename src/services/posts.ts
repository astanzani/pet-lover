import { v4 } from 'uuid';

import { createOne } from '@db/posts';
import { AddPostInput, Post } from '@types';

const POST_ID_PREFIX = 'POST#';

export async function addPost(input: AddPostInput): Promise<Post> {
  const post: Post = {
    ...input,
    postId: POST_ID_PREFIX + v4(),
  };

  const addedPost = await createOne(post);

  return addedPost;
}
