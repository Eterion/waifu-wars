<script setup lang="ts">
import { apolloClient } from '@/apolloClient';
import { provideApolloClient } from '@vue/apollo-composable';
import { logEvent } from 'histoire/client';
import SearchPage from './SearchPage.vue';

provideApolloClient(apolloClient);
</script>

<template>
  <Story>
    <Variant title="Character (Female)">
      <SearchPage
        @update:model-value="logEvent('update:modelValue', [$event])" />
    </Variant>
    <Variant title="Character (Male)">
      <SearchPage
        gender="Male"
        @update:model-value="logEvent('update:modelValue', [$event])" />
    </Variant>
    <Variant title="Character (All)">
      <SearchPage
        :gender="['Female', 'Male', 'Other']"
        @update:model-value="logEvent('update:modelValue', [$event])" />
    </Variant>
    <Variant title="Anime">
      <SearchPage
        type="anime"
        @update:model-value="logEvent('update:modelValue', [$event])" />
    </Variant>
  </Story>
</template>
