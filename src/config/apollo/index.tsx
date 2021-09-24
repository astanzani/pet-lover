import { createUploadLink } from 'apollo-upload-client';
import Auth from '@aws-amplify/auth';
import { setContext } from '@apollo/client/link/context';
import { REACT_APP_API_ENDPOINT } from '@env';
import {
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
  Reference,
} from '@apollo/client';
import { PaginatedList } from '@types';

const uploadLink = createUploadLink({
  uri: REACT_APP_API_ENDPOINT,
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
      Pet: {
        keyFields: ['petId'],
      },
      Query: {
        fields: {
          suggestedPets: {
            keyArgs: false,
            merge(
              existing: PaginatedList<Reference> = { items: [] },
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
  };
};
