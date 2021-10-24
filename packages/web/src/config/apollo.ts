import Auth from '@aws-amplify/auth';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

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
  cache: new InMemoryCache(),
};
