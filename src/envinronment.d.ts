declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DYNAMODB_USERS_TABLE: string;
      NODE_ENV?: string;
    }
  }
}

export {};
