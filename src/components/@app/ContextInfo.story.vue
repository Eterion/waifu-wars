<script setup lang="ts">
import { apolloClient } from '@/apolloClient';
import {
  useGetAnimeQuery,
  useGetCharactersQuery,
} from '@/composables/useGraphQL';
import {
  createCharacterInfoFromGetAnime,
  createCharacterInfoFromGetCharacters,
} from '@/utils/createCharacterInfo';
import { provideApolloClient } from '@vue/apollo-composable';
import { computed, reactive, ref } from 'vue';
import BaseLoader from '../@base/loader/BaseLoader.vue';
import ContextInfo from './ContextInfo.vue';

provideApolloClient(apolloClient);
const buttonRef = ref<HTMLElement>();

const getCharactersQuery = reactive(useGetCharactersQuery({ search: '2B' }));
const characterInfo = computed(() => {
  return createCharacterInfoFromGetCharacters(getCharactersQuery.result).at(0);
});

const getAnimeQuery = reactive(useGetAnimeQuery({ search: 'Nier Automata' }));
const animeInfo = computed(() => {
  return createCharacterInfoFromGetAnime(getAnimeQuery.result).at(0);
});
</script>

<template>
  <Story>
    <Variant title="Character">
      <BaseLoader v-if="getCharactersQuery.loading" />
      <template v-else-if="characterInfo">
        <button ref="buttonRef" type="button">Context Info</button>
        <ContextInfo
          :info="characterInfo"
          :outside-reference-element="buttonRef" />
      </template>
    </Variant>
    <Variant title="Anime">
      <BaseLoader v-if="getAnimeQuery.loading" />
      <template v-else-if="animeInfo">
        <button ref="buttonRef" type="button">Context Info</button>
        <ContextInfo :info="animeInfo" :outside-reference-element="buttonRef" />
      </template>
    </Variant>
  </Story>
</template>
