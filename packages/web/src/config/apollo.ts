import Auth from '@aws-amplify/auth';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
  Reference,
} from '@apollo/client';
import { PaginatedList } from 'types';

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return new Promise((resolve) => {
    Auth.currentSession().then((session) => {
      const token = session.getIdToken().getJwtToken();
      resolve({
        headers: {
          ...headers,
          authorization: token,
        },
      });
    });
  });
});

export const apolloConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feedPosts: {
            keyArgs: false,
            merge(
              existing: PaginatedList<Reference> = { items: [], totalFound: 0 },
              incoming: PaginatedList<Reference>
            ) {
              return merge(existing, incoming);
            },
          },
        },
      },
    },
  }),
};

const merge = (
  existing: PaginatedList<Reference>,
  incoming: PaginatedList<Reference>
): PaginatedList<Reference> => {
  return {
    cursor: incoming.cursor,
    items: [...existing.items, ...incoming.items],
    totalFound: incoming.totalFound,
  };
};
