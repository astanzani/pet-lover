import { Routes } from '@config';

export type RootStackParamList = {
  [Routes.SIGN_IN_STACK]: undefined;
  [Routes.HOME_STACK]: undefined;
  [Routes.FIND_PETS_TO_FOLLOW]: undefined;
};

export type SignInStackParamList = {
  [Routes.SIGN_IN]: undefined;
  [Routes.SIGN_UP]: undefined;
  [Routes.CONFIRM_SIGN_UP]: {
    email: string;
    password: string;
  };
};

export type PetsStackParamList = {
  [Routes.PETS]: undefined;
  [Routes.NEW_PET]: undefined;
};

export type PostsStackParamList = {
  [Routes.NEW_POST]: undefined;
};

export type ProfileStackParamList = {
  [Routes.PROFILE]: undefined;
  [Routes.FOLLOWING]: undefined;
};
