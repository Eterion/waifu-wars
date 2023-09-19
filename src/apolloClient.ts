import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        keyFields: [],
      },
    },
  }),
  link: createHttpLink({
    uri: 'https://graphql.anilist.co/',
  }),
});
