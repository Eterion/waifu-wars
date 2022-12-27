import type { DragInfo } from '@/types/DragInfo';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useCharacterDragStore = defineStore('characterDrag', () => {
  /**
   * Dragging info.
   */

  const dragging = ref<DragInfo>();

  /**
   * Drag and hold character in memory.
   * @param dragInfo - Drag info
   */

  function drag(dragInfo: DragInfo) {
    dragging.value = dragInfo;
  }

  /**
   * Drop character.
   * @returns Dragn info
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
      /** Drag info. */
      dragInfo: DragInfo;
    }) => void
  ) {
    return watch(dragging, (_, wasValue) => {
      if (wasValue) {
        callback.call(null, {
          dragInfo: wasValue,
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
