declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DYNAMODB_USERS_TABLE: string;
      DYNAMODB_PETS_TABLE: string;
      DYNAMODB_POSTS_TABLE: string;
      DYNAMODB_COMMENTS_TABLE: string;
      DYNAMODB_FOLLOWERS_TABLE: string;
      DYNAMODB_FEEDS_TABLE: string;
      PROFILE_PICTURES_BUCKET: string;
      POSTS_PICTURES_BUCKET: string;
      NODE_ENV?: string;
    }
  }
}

export {};
