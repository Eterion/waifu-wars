<script setup lang="ts">
import { apolloClient } from '@/apolloClient';
import {
  useGetAnimeQuery,
  useGetCharactersQuery,
} from '@/composables/useGraphQL';
import { createAnimeInfoFromGetAnime } from '@/utils/createAnimeInfo';
import { createCharacterInfoFromGetCharacters } from '@/utils/createCharacterInfo';
import { provideApolloClient } from '@vue/apollo-composable';
import { computed, reactive } from 'vue';
import BaseLoader from '../@base/loader/BaseLoader.vue';
import PresetCard from './PresetCard.vue';

provideApolloClient(apolloClient);
const getCharactersQuery = reactive(useGetCharactersQuery({ search: '2B' }));
const characterInfo = computed(() => {
  return createCharacterInfoFromGetCharacters(getCharactersQuery.result).at(0);
});

const getAnimeQuery = reactive(useGetAnimeQuery({ search: 'Nier Automata' }));
const animeInfo = computed(() => {
  return createAnimeInfoFromGetAnime(getAnimeQuery.result).at(0);
});
</script>

<template>
  <Story>
    <Variant title="Character">
      <BaseLoader v-if="getCharactersQuery.loading" />
      <PresetCard
        v-else-if="characterInfo"
        title="Airing Season"
        desc="Start with waifus from the current airing season and continue from there."
        to="/"
        :thumbnail="characterInfo.imageUrl"
        :metadata="characterInfo"
        style="width: 265px" />
    </Variant>
    <Variant title="Anime">
      <BaseLoader v-if="getAnimeQuery.loading" />
      <PresetCard
        v-else-if="animeInfo"
        title="Airing Season"
        desc="Start with animes from the current airing season and continue from there."
        to="/"
        :thumbnail="animeInfo.imageUrl"
        :metadata="animeInfo"
        style="width: 265px" />
    </Variant>
  </Story>
</template>
