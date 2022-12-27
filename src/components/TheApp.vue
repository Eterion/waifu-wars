<script setup lang="ts">
import { useCharacterSearchQuery } from '@/composables/useGraphQL';
import { useColorSchemeStore } from '@/stores/useColorScheme';
import type { Character } from '@/types/Character';
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
  return result?.value?.Page?.characters?.reduce<Character[]>(
    (arr, character) => {
      if (character) {
        const anime = character.media?.nodes?.at(0);
        arr.push({
          id: character.id,
          age: character.age,
          animeMalId: anime?.idMal,
          animeName: anime?.title?.userPreferred,
          animeUrl: anime?.title?.userPreferred,
          fullName: character.name?.userPreferred,
          gender: character.gender,
          imageUrl: character.image?.large,
          siteUrl: character.siteUrl,
        });
      }
      return arr;
    },
    []
  );
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
</style>
