import type { DraggingCharacterInfo } from '@/types/DraggingCharacterInfo';
import { isUndefined } from 'lodash-es';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useDraggingCharacterStore = defineStore(
  'draggingCharacter',
  () => {
    /**
     * Dragging info.
     */

    const draggingInfo = ref<DraggingCharacterInfo>();

    /**
     * Drag and hold character in memory.
     * @param dragInfo - Drag info
     */

    function drag(dragInfo: DraggingCharacterInfo) {
      draggingInfo.value = dragInfo;
    }

    /**
     * Drop character.
     * @returns Dragn info
     */

    function drop() {
      const info = draggingInfo.value;
      draggingInfo.value = undefined;
      return info;
    }

    /**
     * Calls {@link callback} function on drop event.
     * @param callback - Callback function
     */

    function onDrop(
      callback: (context: {
        /** Dragging info. */
        draggingInfo: DraggingCharacterInfo;
      }) => void
    ) {
      return watch(draggingInfo, (newValue, oldValue) => {
        if (isUndefined(newValue) && oldValue) {
          callback.call(null, {
            draggingInfo: oldValue,
          });
        }
      });
    }

    return {
      drag,
      draggingInfo,
      drop,
      onDrop,
    };
  }
);
