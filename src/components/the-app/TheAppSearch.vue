<script setup lang="ts">
import { useCharacterSearchQuery } from '@/composables/useGraphQL';
import { useCharactersStore } from '@/stores/useCharacters';
import { createCharacterFromCharacterSearchResult } from '@/utils/createCharacter';
import { computed, reactive, ref } from 'vue';
import BaseCharacter from '../BaseCharacter.vue';
import BaseChip from '../BaseChip.vue';
import GridIcon from '../icons/GridIcon.vue';
import ListIcon from '../icons/ListIcon.vue';
import SearchBox from '../SearchBox.vue';

const searchQuery = ref<string>();
const isGrid = ref(false);
const isFilter = reactive({
  waifus: true,
  husbandos: false,
  other: false,
});

const { result } = useCharacterSearchQuery(
  () => ({ search: searchQuery.value || undefined }),
  { debounce: 300 }
);

const characters = computed(() => {
  return createCharacterFromCharacterSearchResult(result.value);
});

const characterStore = useCharactersStore();
const charactersWithSavedInfo = computed(() => {
  return (characters.value || []).map((characterInfo) => {
    return {
      characterInfo,
      isSaved: characterStore.savedCharacterIds.includes(characterInfo.id),
    };
  });
});

const filteredCharacters = computed(() => {
  return charactersWithSavedInfo.value.filter(({ characterInfo }) => {
    switch (characterInfo.gender) {
      case 'Male':
        return isFilter.husbandos;
      case 'Female':
        return isFilter.waifus;
      default:
        return isFilter.other;
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
          <button type="button" @click="isGrid = !isGrid">
            <ListIcon v-if="isGrid" />
            <GridIcon v-else />
          </button>
        </li>
        <li>
          <BaseChip v-model:active="isFilter.waifus">Waifus</BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="isFilter.husbandos">Husbandos</BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="isFilter.other">Other</BaseChip>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li
          v-for="{ characterInfo, isSaved } in filteredCharacters"
          :key="characterInfo.id">
          <BaseCharacter
            :card="isGrid"
            :info="characterInfo"
            :is-saved="isSaved"
            drag-event-origin="search" />
        </li>
      </ul>
    </div>
  </div>
</template>
