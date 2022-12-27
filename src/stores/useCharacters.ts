import { useCharacterSearchQuery } from '@/composables/useGraphQL';
import type { Character } from '@/types/Character';
import { createCharacterFromCharacterSearchResult } from '@/utils/createCharacter';
import { useStorage } from '@vueuse/core';
import { remove } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useTierStore } from './useTier';

export const useCharactersStore = defineStore('characters', () => {
  /**
   * Array of saved character ids.
   */

  const savedCharacterIds = useStorage<number[]>('waifu-wars-characters', []);

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
   * Adds new character to {@link savedCharacterIds}.
   * @param id - Character id
   * @param info - Info
   */

  function saveCharacter(id: number, info?: Omit<Character, 'id'>) {
    if (!savedCharacterIds.value.includes(id)) {
      savedCharacterIds.value.push(id);
    }
    if (info && !characterIds.value.includes(id)) {
      characters.value.push({
        id,
        ...info,
      });
    }
  }

  /**
   * Removes character from {@link savedCharacterIds}.
   * @param id - Character id
   */

  function removeCharacter(id: number) {
    remove(savedCharacterIds.value, (_id) => _id === id);
    remove(characters.value, ({ id: _id }) => _id === id);
  }

  /**
   * Reset to default values.
   */

  function reset() {
    useTierStore().clearCharacters();
    savedCharacterIds.value = [];
    characters.value = [];
  }

  // Load missing character info
  const { loading, onResult } = useCharacterSearchQuery(
    () => ({
      pick: savedCharacterIds.value.filter((id) => {
        return !characterIds.value.includes(id);
      }),
    }),
    { debounce: 300 }
  );

  // Save character info
  onResult(({ data }) => {
    createCharacterFromCharacterSearchResult(data, ({ id, ...info }) => {
      saveCharacter(id, info);
    });
  });

  return {
    characterIds,
    characters,
    loading,
    removeCharacter,
    reset,
    saveCharacter,
    savedCharacterIds,
  };
});
