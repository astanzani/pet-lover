export interface Post {
  petId: string;
  postId: string;
  content: string;
}

export type AddPostInput = Omit<Post, 'postId'>;
