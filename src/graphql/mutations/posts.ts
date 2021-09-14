import { gql, useMutation } from '@apollo/client';

import { AddPostInput, Post } from '@types';

export const ADD_POST = gql`
  mutation addPost($props: AddPostInput!) {
    addPost(props: $props) {
      postId
      petId
      text
      pictures
    }
  }
`;

export function useAddPostMutation() {
  return useMutation<{ addPet: Post; props: AddPostInput }>(ADD_POST);
}
