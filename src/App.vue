<script setup lang="ts">
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from 'vue';
import TheApp from './components/TheApp.vue';

const apolloClient = new ApolloClient({
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

provide(DefaultApolloClient, apolloClient);
</script>

<template>
  <TheApp />
</template>
