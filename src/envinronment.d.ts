declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DYNAMODB_USERS_TABLE: string;
      PROFILE_PICTURES_BUCKET: string;
      NODE_ENV?: string;
    }
  }
}

export {};
