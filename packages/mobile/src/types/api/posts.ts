import { ReactNativeFile } from 'extract-files';

export interface Post {
  petId: string;
  postId: string;
  text?: string;
  pictures?: string[];
}

export type AddPostInput = Omit<Post, 'postId' | 'pictures'> & {
  pictures?: Array<ReactNativeFile>;
};
