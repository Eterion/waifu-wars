import type { Character } from '@/types/Character';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useCharacterDragStore = defineStore('characterDrag', () => {
  /**
   * Dragging character info.
   */

  const dragging = ref<Character>();

  /**
   * Drag and hold character in memory.
   * @param character - Character info
   */

  function drag(character: Character) {
    dragging.value = character;
  }

  /**
   * Drop character.
   * @returns Character info
   */

  function drop() {
    const info = dragging.value;
    dragging.value = undefined;
    return info;
  }

  /**
   * Calls {@link callback} function on drop event.
   * @param callback - Callback function
   */

  function onDrop(
    callback: (context: {
      /** Character info. */
      characterInfo: Character;
    }) => void
  ) {
    return watch(dragging, (_, wasCharacterInfo) => {
      if (wasCharacterInfo) {
        callback.call(null, {
          characterInfo: wasCharacterInfo,
        });
      }
    });
  }

  return {
    drag,
    dragging,
    drop,
    onDrop,
  };
});
