import { Routes } from '@config';

export type RootStackParamList = {
  [Routes.SIGN_IN_STACK]: undefined;
  [Routes.HOME_STACK]: undefined;
};

export type SignInStackParamList = {
  [Routes.SIGN_IN]: undefined;
  [Routes.SIGN_UP]: undefined;
  [Routes.CONFIRM_SIGN_UP]: {
    email: string;
    password: string;
  };
};
