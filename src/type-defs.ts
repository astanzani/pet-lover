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

  type PaginatedPets {
    items: [Pet!]!
    cursor: String
    totalFound: Int!
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

  type FollowingRelationship {
    userId: String!
    petId: String!
  }

  type Mutation {
    addUser(props: AddUserInput!): User!
    uploadUserProfilePicture(picture: Upload!): String!

    addPet(props: AddPetInput!): Pet!
    uploadPetProfilePicture(petId: String!, picture: Upload!): String!

    addPost(props: AddPostInput!): Post!

    followPet(petId: String!, ownerId: String!): FollowingRelationship!
    unfollowPet(petId: String!, ownerId: String!): FollowingRelationship!
  }

  type Query {
    me: User!
    pets: [Pet!]!
    suggestedPets(first: Int = 10, cursor: String): PaginatedPets!
    followees(first: Int = 10, cursor: String): PaginatedPets!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
