<script setup lang="ts">
import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from 'vue';
import { apolloClient } from './apolloClient';
import TheApp from './components/the-app/TheApp.vue';

provide(DefaultApolloClient, apolloClient);
</script>

<template>
  <TheApp />
</template>
