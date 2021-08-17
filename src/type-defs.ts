import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  scalar Upload

  input AddUserInput {
    email: String!
    name: String!
  }

  type User {
    userId: String!
    email: String!
    name: String!
  }

  type Mutation {
    addUser(props: AddUserInput!): User!
    uploadUserProfilePicture(picture: Upload!): String!
  }

  type Query {
    me: User!
    testMessage: String!
  }
`;
