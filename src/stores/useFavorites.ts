import { useCharacterSearchQuery } from '@/composables/useGraphQL';
import type { Character } from '@/types/Character';
import { createCharacterFromCharacterSearchResult } from '@/utils/createCharacter';
import { useStorage } from '@vueuse/core';
import { remove } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
  /**
   * Array of favorite character ids.
   */

  const favoriteIds = useStorage<number[]>('waifu-wars-favorites', []);

  /**
   * Character data.
   */

  const characters = ref<Character[]>([]);

  /**
   * Character ids computed from {@link characters} value.
   */

  const characterIds = computed(() => {
    return characters.value.map(({ id }) => {
      return id;
    });
  });

  /**
   * Adds new character to favorites.
   * @param id - Character id
   * @param info - Info
   */

  function addFavorite(id: number, info?: Omit<Character, 'id'>) {
    if (!favoriteIds.value.includes(id)) {
      favoriteIds.value.push(id);
    }
    if (info && !characterIds.value.includes(id)) {
      characters.value.push({
        id,
        ...info,
      });
    }
  }

  /**
   * Removes character from favorites.
   * @param id - Character id
   */

  function removeFavorite(id: number) {
    remove(favoriteIds.value, (_id) => _id === id);
    remove(characters.value, ({ id: _id }) => _id === id);
  }

  /**
   * Reset to default values.
   */

  function reset() {
    favoriteIds.value = [];
    characters.value = [];
  }

  // Load missing character info
  const { loading, onResult } = useCharacterSearchQuery(
    () => ({
      pick: favoriteIds.value.filter((id) => {
        return !characterIds.value.includes(id);
      }),
    }),
    { debounce: 300 }
  );

  // Save character info
  onResult(({ data }) => {
    createCharacterFromCharacterSearchResult(data, ({ id, ...info }) => {
      addFavorite(id, info);
    });
  });

  return {
    addFavorite,
    characterIds,
    characters,
    favoriteIds,
    loading,
    removeFavorite,
    reset,
  };
});
