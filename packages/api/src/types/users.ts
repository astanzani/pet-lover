export interface User {
  userId: string;
  name: string;
  email: string;
}

export type AddUserInput = Omit<User, 'userId'>;
