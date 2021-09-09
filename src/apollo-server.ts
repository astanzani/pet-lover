import { ApolloServer } from 'apollo-server-lambda';
import express from 'express';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';

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
  expressAppFromMiddleware(middleware) {
    const app = express();
    app.use(graphqlUploadExpress());
    app.use(cors());
    app.use(middleware);
    return app;
  },
  expressGetMiddlewareOptions: {
    cors: {
      origin: '*',
      credentials: true,
    },
  },
});
