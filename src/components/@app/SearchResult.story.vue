<script setup lang="ts">
import { apolloClient } from '@/apolloClient';
import {
  useGetAnimeQuery,
  useGetCharactersQuery,
} from '@/composables/useGraphQL';
import { createAnimeInfoFromGetAnime } from '@/utils/createAnimeInfo';
import { createCharacterInfoFromGetCharacters } from '@/utils/createCharacterInfo';
import { provideApolloClient } from '@vue/apollo-composable';
import { logEvent } from 'histoire/client';
import { computed, reactive } from 'vue';
import BaseLoader from '../@base/loader/BaseLoader.vue';
import SearchResult from './SearchResult.vue';

provideApolloClient(apolloClient);
const getCharactersQuery = reactive(useGetCharactersQuery({ search: '2B' }));
const characterInfo = computed(() => {
  const info = createCharacterInfoFromGetCharacters(
    getCharactersQuery.result,
  ).at(0);
  if (!info) return undefined;
  return {
    image: info.imageUrl,
    name: info.fullName,
    metadata: info,
  } as InstanceType<typeof SearchResult>['$props'];
});

const getAnimeQuery = reactive(useGetAnimeQuery({ search: 'Nier Automata' }));
const animeInfo = computed(() => {
  const info = createAnimeInfoFromGetAnime(getAnimeQuery.result).at(0);
  if (!info) return undefined;
  return {
    image: info.imageUrl,
    name: info.name,
    metadata: info,
  } as InstanceType<typeof SearchResult>['$props'];
});

function initState() {
  return {
    checked: false,
  };
}
</script>

<template>
  <Story>
    <Variant v-slot="{ state }" title="Character" :init-state="initState">
      <BaseLoader v-if="getCharactersQuery.loading" />
      <SearchResult
        v-else-if="characterInfo"
        :class="$style.result"
        v-bind="characterInfo"
        :checked="state.checked"
        @click="(state.checked = !state.checked), logEvent('click', $event)" />
    </Variant>
    <Variant v-slot="{ state }" title="Anime" :init-state="initState">
      <BaseLoader v-if="getAnimeQuery.loading" />
      <SearchResult
        v-else-if="animeInfo"
        :class="$style.result"
        v-bind="animeInfo"
        :checked="state.checked"
        @click="(state.checked = !state.checked), logEvent('click', $event)" />
    </Variant>
    <Variant title="Checked">
      <BaseLoader v-if="getCharactersQuery.loading" />
      <SearchResult
        v-else-if="characterInfo"
        :class="$style.result"
        v-bind="characterInfo"
        checked
        @click="logEvent('click', $event)" />
    </Variant>
  </Story>
</template>

<style module lang="scss">
.result {
  width: 150px;
}
</style>
