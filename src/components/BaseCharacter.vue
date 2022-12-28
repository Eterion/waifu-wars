<script setup lang="ts">
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import type { Character } from '@/types/Character';
import type { DragEventOrigin } from '@/types/DragEventOrigin';
import { computed } from 'vue';

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
  imageWidth?: number;
  /**
   * Character info.
   */
  info: Character;
}>();

const imageWidth = computed(() => {
  const defaultWidth = props.card ? 100 : 46;
  return `${props.imageWidth ?? defaultWidth}px`;
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
  <div
    :class="card ? $style.card : $style.default"
    @mousedown.left.stop.prevent="onMouseDown">
    <img
      v-if="info.imageUrl"
      :class="$style.img"
      :src="info.imageUrl"
      :alt="info.fullName || 'Unknown'"
      loading="lazy" />
    <div v-if="!card">
      <div>{{ info.fullName }}</div>
      <div>{{ info.animeName }}</div>
    </div>
  </div>
</template>

<style module lang="scss">
.default {
  align-items: center;
  display: flex;

  .img {
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    object-fit: cover;
    size: v-bind(imageWidth);
  }
}

.card {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  width: v-bind(imageWidth);

  .img {
    object-fit: cover;
    width: 100%;
  }
}
</style>
