import { gql } from 'apollo-server-core';

export const typeDefs = gql`
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
  }

  type Query {
    me: String!
    testMessage: String!
  }
`;
