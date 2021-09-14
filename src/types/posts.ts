import { FileUpload } from 'graphql-upload';

export interface Post {
  petId: string;
  postId: string;
  text?: string;
  pictures?: string[];
}

export type AddPostInput = Omit<Post, 'postId' | 'pictures'> & {
  pictures?: Array<Promise<FileUpload>>;
};
