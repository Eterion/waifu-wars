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
import { useElementSize, useUrlSearchParams } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';
import ExternalLinkIcon from '../@icons/ExternalLinkIcon.vue';
import GridIcon from '../@icons/GridIcon.vue';
import ListIcon from '../@icons/ListIcon.vue';
import BaseChip from '../base-chip/BaseChip.vue';
import CharacterCard from '../CharacterCard.vue';
import SearchBox from '../SearchBox.vue';

const params = useUrlSearchParams<{ q?: string }>('history');
const searchQuery = ref<string | undefined>(params.q);
watch(searchQuery, (searchQuery) => {
  params.q = searchQuery;
});

const options = reactive({
  grid: true,
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
  characterSearchCharacters,
  (searchResult) => {
    options.anime = !searchResult.length;
  },
  { deep: true }
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

const GRID_GAP = 12;
const GRID_COLUMNS = 5;
const searchResultsRef = ref<HTMLElement>();
const { width: searchResultsWidth } = useElementSize(searchResultsRef);
const gridWidth = computed(() => {
  return (searchResultsWidth.value - GRID_GAP * GRID_COLUMNS) / GRID_COLUMNS;
});
const searchResultsMarginRight = computed(() => {
  if (searchResultsRef.value instanceof HTMLElement)
    return `${
      searchResultsRef.value.clientWidth -
      searchResultsRef.value.offsetWidth -
      GRID_GAP
    }px`;
  return 0;
});
</script>

<template>
  <div :class="$style.el">
    <div>
      <SearchBox v-model="searchQuery" :class="$style.searchBox" />
      <div :class="$style.poweredBy">
        Search powered by
        <a
          href="https://anilist.gitbook.io/anilist-apiv2-docs/"
          :class="$style.link"
          target="_blank">
          anilist.co <ExternalLinkIcon :size="12" />
        </a>
      </div>
      <ul :class="$style.filter">
        <li>
          <button
            :class="$style.displayFormat"
            type="button"
            @click="options.grid = !options.grid">
            <ListIcon v-if="options.grid" :size="18" />
            <GridIcon v-else :size="18" />
          </button>
        </li>
        <li>
          <BaseChip v-model:active="options.anime" color="gray">
            Anime
          </BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="options.waifus" color="pink">
            Waifus
          </BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="options.husbandos" color="blue">
            Husbandos
          </BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="options.other" color="teal">
            Other
          </BaseChip>
        </li>
      </ul>
    </div>
    <div ref="searchResultsRef" :class="$style.searchResults">
      <ul :class="options.grid ? $style.grid : $style.list">
        <li
          v-for="{ characterInfo, isSaved } in displayedCharacters"
          :key="characterInfo.id">
          <CharacterCard
            :card="options.grid"
            :image-width="options.grid ? gridWidth : 42"
            :info="characterInfo"
            :is-saved="isSaved"
            drag-event-origin="search" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style module lang="scss">
@use '@/sass/scrollbar';

.el {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  min-height: 0;
  row-gap: 24px;
}

.searchBox {
  margin-bottom: 6px;
}

.poweredBy {
  color: var(--text-light);
  font-size: 0.8125rem;
  margin-bottom: 12px;
  padding: false 6px;

  .link {
    color: var(--primary-surface);
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}

.filter {
  align-items: center;
  column-gap: 6px;
  display: flex;
  list-style: none;
  padding: 0;
}

.displayFormat {
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  size: 36px;
  &:hover {
    color: var(--text);
  }
}

.searchResults {
  @include scrollbar.thin;
  // margin-right: v-bind(searchResultsMarginRight);
  min-width: 0;
  overflow-y: auto;
  scrollbar-gutter: stable;

  .grid {
    display: grid;
    gap: calc(v-bind(GRID_GAP) * 1px);
    grid-template-columns: repeat(auto-fill, calc(v-bind(gridWidth) * 1px));
    list-style: none;
    padding: 0;
  }

  .list {
    list-style: none;
    padding: 0;
    & > li:not(:last-child) {
      margin-bottom: 6px;
    }
  }
}
</style>
