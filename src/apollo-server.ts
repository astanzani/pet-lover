import { ApolloServer } from 'apollo-server-lambda';

import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  context({ event }) {
    const userId =
      event?.requestContext?.authorizer?.claims?.['cognito:username'];
    return { userId };
  },
});

export const graphqlHandler = apolloServer.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: '*',
      credentials: true,
    },
  },
});
