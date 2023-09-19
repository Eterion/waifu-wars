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
      <SearchPage @change="logEvent('change', [$event])" />
    </Variant>
    <Variant title="Character (Male)">
      <SearchPage gender="Male" @change="logEvent('change', [$event])" />
    </Variant>
    <Variant title="Character (All)">
      <SearchPage
        :gender="['Female', 'Male', 'Other']"
        @change="logEvent('change', [$event])" />
    </Variant>
    <Variant title="Anime">
      <SearchPage type="anime" @change="logEvent('change', [$event])" />
    </Variant>
  </Story>
</template>
