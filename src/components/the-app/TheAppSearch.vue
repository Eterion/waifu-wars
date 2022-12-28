<script setup lang="ts">
import {
  useAnimeSearchQuery,
  useCharacterSearchQuery,
} from '@/composables/useGraphQL';
import { useCharactersStore } from '@/stores/useCharacters';
import {
  createCharacterFromAnimeSearchResult,
  createCharacterFromCharacterSearchResult,
} from '@/utils/createCharacter';
import { computed, reactive, ref, watch } from 'vue';
import BaseCharacter from '../BaseCharacter.vue';
import BaseChip from '../BaseChip.vue';
import GridIcon from '../icons/GridIcon.vue';
import ListIcon from '../icons/ListIcon.vue';
import SearchBox from '../SearchBox.vue';

const searchQuery = ref<string>();
const options = reactive({
  grid: false,
  anime: false,
  waifus: true,
  husbandos: false,
  other: false,
});

const { result: animeSearchResult } = useAnimeSearchQuery(
  () => ({ search: searchQuery.value || '' }),
  { debounce: 300 }
);
const animeSearchCharacters = computed(() => {
  return createCharacterFromAnimeSearchResult(animeSearchResult.value);
});

const { result: characterSearchResult } = useCharacterSearchQuery(
  () => ({ search: searchQuery.value || undefined }),
  { debounce: 300 }
);
const characterSearchCharacters = computed(() => {
  return createCharacterFromCharacterSearchResult(characterSearchResult.value);
});
watch(
  () => characterSearchCharacters.value.length,
  (length) => {
    options.anime = !length;
  }
);

const characterSearchResults = computed(() => {
  return options.anime
    ? animeSearchCharacters.value
    : characterSearchCharacters.value;
});

const characterStore = useCharactersStore();
const charactersWithSavedInfo = computed(() => {
  return (characterSearchResults.value || []).map((characterInfo) => {
    return {
      characterInfo,
      isSaved: characterStore.savedCharacterIds.includes(characterInfo.id),
    };
  });
});

const displayedCharacters = computed(() => {
  return charactersWithSavedInfo.value.filter(({ characterInfo }) => {
    switch (characterInfo.gender) {
      case 'Male':
        return options.husbandos;
      case 'Female':
        return options.waifus;
      default:
        return options.other;
    }
  });
});
</script>

<template>
  <div>
    <div>
      <SearchBox v-model="searchQuery" />
      <div>Search powered by Anilist public api.</div>
    </div>
    <div>
      <ul>
        <li>
          <button type="button" @click="options.grid = !options.grid">
            <ListIcon v-if="options.grid" />
            <GridIcon v-else />
          </button>
        </li>
        <li>
          <BaseChip v-model:active="options.anime">Anime</BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="options.waifus">Waifus</BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="options.husbandos">Husbandos</BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="options.other">Other</BaseChip>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li
          v-for="{ characterInfo, isSaved } in displayedCharacters"
          :key="characterInfo.id">
          <BaseCharacter
            :card="options.grid"
            :image-width="42"
            :info="characterInfo"
            :is-saved="isSaved"
            drag-event-origin="search" />
        </li>
      </ul>
    </div>
  </div>
</template>
