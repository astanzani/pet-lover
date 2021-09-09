import { addPost } from '@services/posts';
import { AddPostInput } from '@types';

export const postsMutations = {
  addPost(_parent: any, { props }: { props: AddPostInput }) {
    return addPost(props);
  },
};
