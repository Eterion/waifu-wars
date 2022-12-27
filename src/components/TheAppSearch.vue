<script setup lang="ts">
import { useCharacterSearchQuery } from '@/composables/useGraphQL';
import { createCharacterFromCharacterSearchResult } from '@/utils/createCharacter';
import { computed, reactive, ref } from 'vue';
import BaseCharacter from './BaseCharacter.vue';
import BaseChip from './BaseChip.vue';
import GridIcon from './icons/GridIcon.vue';
import ListIcon from './icons/ListIcon.vue';
import SearchBox from './SearchBox.vue';

const searchQuery = ref<string>();
const isGrid = ref(false);
const isFilter = reactive({
  waifus: true,
  husbandos: false,
  other: false,
});

const { result } = useCharacterSearchQuery(
  () => ({ search: searchQuery.value }),
  { debounce: 300 }
);

const characters = computed(() => {
  return createCharacterFromCharacterSearchResult(result.value);
});

const filteredCharacters = computed(() => {
  return characters.value?.filter(({ gender }) => {
    switch (gender) {
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
        <li v-for="characterInfo in filteredCharacters" :key="characterInfo.id">
          <BaseCharacter :card="isGrid" :info="characterInfo" />
        </li>
      </ul>
    </div>
  </div>
</template>
