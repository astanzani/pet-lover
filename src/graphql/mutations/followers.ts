import { gql, useMutation } from '@apollo/client';

import { FollowingRelationship } from '@types';

export const FOLLOW_PET = gql`
  mutation followPet($petId: String!, $ownerId: String!) {
    followPet(petId: $petId, ownerId: $ownerId) {
      userId
      petId
    }
  }
`;

export function useFollowPetMutation() {
  return useMutation<
    {
      followPet: FollowingRelationship;
    },
    { petId: string; ownerId: string }
  >(FOLLOW_PET);
}

export const UNFOLLOW_PET = gql`
  mutation unfollowPet($petId: String!, $ownerId: String!) {
    unfollowPet(petId: $petId, ownerId: $ownerId) {
      userId
      petId
    }
  }
`;

export function useUnfollowPetMutation() {
  return useMutation<
    { unfollowPet: FollowingRelationship },
    { petId: string; ownerId: string }
  >(UNFOLLOW_PET);
}
