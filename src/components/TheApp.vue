<script setup lang="ts">
import { useCharacterSearchQuery } from '@/composables/useGraphQL';
import { useColorSchemeStore } from '@/stores/useColorScheme';
import { useFavoritesStore } from '@/stores/useFavorites';
import { createCharacterFromCharacterSearchResult } from '@/utils/createCharacter';
import { computed, reactive, ref } from 'vue';
import BaseCharacter from './BaseCharacter.vue';
import BaseChip from './BaseChip.vue';
import GithubIcon from './icons/GithubIcon.vue';
import GridIcon from './icons/GridIcon.vue';
import ListIcon from './icons/ListIcon.vue';
import MoonIcon from './icons/MoonIcon.vue';
import ShareIcon from './icons/ShareIcon.vue';
import SunIcon from './icons/SunIcon.vue';
import SearchBox from './SearchBox.vue';

const favoritesStore = useFavoritesStore();
const colorSchemeStore = useColorSchemeStore();
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
  <div :class="$style.el">
    <aside :class="$style.sidebar">
      <div>
        <h1>Waifu Wars</h1>
        <p>
          We all have our favorite waifus. And of course we can scientifically
          prove it by comparing them to inferior trash.
        </p>
      </div>
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
            v-for="characterInfo in filteredCharacters"
            :key="characterInfo.id">
            <BaseCharacter :card="isGrid" :info="characterInfo" />
          </li>
        </ul>
      </div>
    </aside>
    <main :class="$style.main">
      <div>
        <ul>
          <li>
            <button type="button">
              <ShareIcon />
            </button>
          </li>
          <li>
            <a href="https://github.com/Eterion/waifu-wars" target="_blank">
              <GithubIcon />
            </a>
          </li>
          <li>
            <button type="button" @click="colorSchemeStore.toggle()">
              <SunIcon v-if="colorSchemeStore.isDark" />
              <MoonIcon v-else />
            </button>
          </li>
        </ul>
      </div>
      <div>
        <ul :class="$style.favorites">
          <li
            v-for="character in favoritesStore.characters"
            :key="character.id">
            <BaseCharacter card :info="character" />
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<style module lang="scss">
.el {
  display: grid;
  grid-template-columns: 480px 1fr;
}

.sidebar,
.main {
  padding: 64px;
}

.favorites {
  column-gap: 12px;
  display: flex;
  list-style: none;
  padding: 0;
}
</style>
