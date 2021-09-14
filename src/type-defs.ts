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

  input AddPetInput {
    name: String!
    picture: String
  }

  type Pet {
    petId: String!
    userId: String!
    name: String!
    picture: String
  }

  input AddPostInput {
    petId: String!
    text: String
    pictures: [Upload!]
  }

  type Post {
    postId: String!
    petId: String!
    text: String
    pictures: [String!]
  }

  type Mutation {
    addUser(props: AddUserInput!): User!
    uploadUserProfilePicture(picture: Upload!): String!

    addPet(props: AddPetInput!): Pet!
    uploadPetProfilePicture(petId: String!, picture: Upload!): String!

    addPost(props: AddPostInput!): Post!
  }

  type Query {
    me: User!
    pets: [Pet!]!
    testMessage: String!
  }
`;
