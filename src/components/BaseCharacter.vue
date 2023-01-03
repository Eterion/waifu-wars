<script setup lang="ts">
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import type { Character } from '@/types/Character';
import type { DragEventOrigin } from '@/types/DragEventOrigin';
import { computed, ref } from 'vue';
import BaseTooltip from './BaseTooltip.vue';

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

const elRef = ref<HTMLElement>();
const hasTooltip = computed(() => props.card && props.dragEventOrigin);

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
    <div
      ref="elRef"
      :class="[
        $style.el,
        card ? $style.card : $style.default,
        { [$style.saved]: isSaved },
      ]">
      <div :class="[$style.img, card ? $style.card : $style.default]">
        <img
          v-if="info.imageUrl"
          :src="info.imageUrl"
          :alt="info.fullName || 'Unknown'"
          loading="lazy" />
      </div>
      <div v-if="!card" :class="$style.text">
        <div :class="$style.fullName">{{ info.fullName }}</div>
        <div :class="$style.animeName">{{ info.animeName }}</div>
      </div>
    </div>
    <BaseTooltip
      v-if="hasTooltip"
      :outside-reference-el="elRef"
      placement="top">
      <template #value>
        {{ info.fullName }}
      </template>
    </BaseTooltip>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  &.default {
    align-items: center;
    column-gap: 12px;
    display: flex;
    line-height: 1.4;
    min-width: 0;
  }

  &.saved {
    filter: grayscale(1);
    opacity: 0.25;
  }
}

.img {
  aspect-ratio: var(--aspect-ratio);
  overflow: hidden;
  position: relative;
  width: v-bind(imageWidth);

  &.default {
    border-radius: 6px;
    flex-shrink: 0;
  }

  &.card {
    border-radius: 12px;
  }

  & > img {
    display: block;
    object-fit: cover;
    width: 100%;
  }
}

.text {
  min-width: 0;
}

.fullName {
  font-weight: semibold;
}

.animeName {
  color: var(--text-light);
  font-size: 0.8125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
