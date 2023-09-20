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
import DraggableCard from './DraggableCard.vue';

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
      <DraggableCard
        v-else-if="characterInfo"
        :image="characterInfo.imageUrl"
        :name="characterInfo.fullName"
        :metadata="characterInfo"
        @remove="logEvent('remove', $event)" />
    </Variant>
    <Variant title="Anime">
      <BaseLoader v-if="getAnimeQuery.loading" />
      <DraggableCard
        v-else-if="animeInfo"
        :image="animeInfo.imageUrl"
        :name="animeInfo.name"
        :metadata="animeInfo"
        @remove="logEvent('remove', $event)" />
    </Variant>
    <Variant title="Faded">
      <BaseLoader v-if="getCharactersQuery.loading" />
      <DraggableCard
        v-else-if="characterInfo"
        :image="characterInfo.imageUrl"
        :name="characterInfo.fullName"
        :metadata="characterInfo"
        faded
        @remove="logEvent('remove', $event)" />
    </Variant>
    <Variant title="Removable">
      <BaseLoader v-if="getCharactersQuery.loading" />
      <DraggableCard
        v-else-if="characterInfo"
        :image="characterInfo.imageUrl"
        :name="characterInfo.fullName"
        :metadata="characterInfo"
        removable
        @remove="logEvent('remove', $event)" />
    </Variant>
  </Story>
</template>
