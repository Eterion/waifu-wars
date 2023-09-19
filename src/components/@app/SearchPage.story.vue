<script setup lang="ts">
import { apolloClient } from '@/apolloClient';
import { provideApolloClient } from '@vue/apollo-composable';
import { logEvent } from 'histoire/client';
import { ref } from 'vue';
import SearchPage from './SearchPage.vue';

provideApolloClient(apolloClient);
const checkedIds = ref<number[]>([]);
</script>

<template>
  <Story>
    <SearchPage
      v-model="checkedIds"
      @update:model-value="logEvent('update:modelValue', [$event])" />
  </Story>
</template>
