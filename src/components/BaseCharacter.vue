<script setup lang="ts">
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import type { Character } from '@/types/Character';
import type { DragEventOrigin } from '@/types/DragEventOrigin';
import { computed } from 'vue';
import CheckIcon from './icons/CheckIcon.vue';

const props = defineProps<{
  /**
   * Changes display format to a card.
   */
  card?: boolean;
  /**
   * Origin of the drag event.
   */
  dragEventOrigin: DragEventOrigin | false;
  /**
   * Image width, in pixels.
   */
  imageWidth: number;
  /**
   * Character info.
   */
  info: Character;
  /**
   * Indicates the character is saved.
   */
  isSaved?: boolean;
}>();

const imageWidth = computed(() => {
  return `${props.imageWidth}px`;
});

const tierStore = useTierStore();
const draggingCharacterStore = useDraggingCharacterStore();
function onMouseDown() {
  if (props.dragEventOrigin) {
    if (props.dragEventOrigin === 'search' || props.dragEventOrigin === 'tier')
      tierStore.removeCharacter(props.info.id);
    draggingCharacterStore.drag({
      character: props.info,
      origin: props.dragEventOrigin,
    });
  }
}
</script>

<template>
  <div @mousedown.left.stop.prevent="onMouseDown">
    <div :class="[$style.el, { [$style.default]: !card }]">
      <div :class="[$style.img, { [$style.default]: !card }]">
        <div v-if="isSaved" :class="$style.saved">
          <CheckIcon />
        </div>
        <img
          v-if="info.imageUrl"
          :src="info.imageUrl"
          :alt="info.fullName || 'Unknown'"
          loading="lazy" />
      </div>
      <div v-if="!card">
        <div>{{ info.fullName }}</div>
        <div>{{ info.animeName }}</div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  &.default {
    align-items: center;
    column-gap: 12px;
    display: flex;
  }
}

.img {
  aspect-ratio: var(--aspect-ratio);
  overflow: hidden;
  position: relative;
  width: v-bind(imageWidth);

  &.default {
    flex-shrink: 0;
  }

  & > img {
    display: block;
    object-fit: cover;
    width: 100%;
  }
}

.saved {
  align-items: center;
  background-color: rgba($oc-gray-9, 0.75);
  display: flex;
  justify-content: center;
  position: absolute 0;
}
</style>
