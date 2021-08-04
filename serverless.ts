import type { Serverless } from 'serverless/aws';

const config: Serverless = {
  service: 'pet-lover-api',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
  },
  functions: {
    graphql: {
      handler: 'src/apollo-server.graphqlHandler',
      events: [
        {
          http: {
            path: 'graphql',
            method: 'post',
            cors: true,
          },
        },
        {
          http: {
            path: 'graphql',
            method: 'get',
            cors: true,
          },
        },
      ],
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  custom: {
    webpack: {
      includeModules: true,
    },
  },
};

module.exports = config;
