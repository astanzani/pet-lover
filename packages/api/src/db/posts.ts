import { Post } from '@generated/graphql';
import { create, get } from './common';

interface PostsTableKey {
  petId: string;
  postId: string;
}

export async function createOne(input: Post): Promise<Post> {
  const postsTable = process.env.DYNAMODB_POSTS_TABLE;
  const post = await create<Post>(postsTable, input);
  return post;
}

export async function getPosts(keys: PostsTableKey[]): Promise<Post[] | null> {
  const postsTable = process.env.DYNAMODB_POSTS_TABLE;
  const posts = await get<Post>(postsTable, keys);
  return posts;
}
