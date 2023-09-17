<script setup lang="ts">
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import type { Character } from '@/types/Character';
import type { DragEventOrigin } from '@/types/DragEventOrigin';
import type { DraggingCharacterInfo } from '@/types/DraggingCharacterInfo';
import { useElementSize, useMouseInElement } from '@vueuse/core';
import { remove } from 'lodash-es';
import { computed, ref } from 'vue';
import CharacterCard from './CharacterCard.vue';

const props = defineProps<{
  /**
   * Card width.
   */
  cardWidth: number;
  /**
   * Array of characters.
   */
  characters: Character[];
}>();

const emit = defineEmits<{
  (e: 'drop', draggingInfo: DraggingCharacterInfo): void;
}>();

const invisibleRef = ref<HTMLElement>();
const { height: minHeight } = useElementSize(invisibleRef);
const draggingCharacterStore = useDraggingCharacterStore();
const dropZoneRef = ref<HTMLElement>();
const { isOutside: isOutsideOfDropZone } = useMouseInElement(dropZoneRef);

const isInDropZone = computed(() => {
  return draggingCharacterStore.draggingInfo && !isOutsideOfDropZone.value;
});

const candidateIds = ref<number[]>([]);
function onMouseInSecondQuadrant(id: number, isInQuadrant: boolean) {
  if (isInQuadrant) candidateIds.value.push(id);
  else remove(candidateIds.value, (value) => value === id);
}

draggingCharacterStore.onDrop(({ draggingInfo }) => {
  if (!isOutsideOfDropZone.value) {
    emit('drop', draggingInfo);
  }
});

const charactersWithDragged = computed(() => {
  const arr = props.characters.map<{
    character: Character;
    dragEventOrigin?: DragEventOrigin;
  }>((character) => ({
    character,
    dragEventOrigin: 'character',
  }));
  if (draggingCharacterStore.draggingInfo)
    if (isInDropZone.value) {
      const index = arr.findIndex(({ character }) => {
        return candidateIds.value.includes(character.id);
      });
      arr.splice(index, 0, {
        character: draggingCharacterStore.draggingInfo.character,
      });
    }
  return arr;
});
</script>

<template>
  <div>
    <div ref="invisibleRef" :class="$style.invisible" />
    <div
      ref="dropZoneRef"
      :class="[$style.drop, { [$style.isActive]: isInDropZone }]">
      <div v-if="charactersWithDragged.length" :class="$style.cards">
        <CharacterCard
          v-for="{ character, dragEventOrigin } in charactersWithDragged"
          :key="character.id"
          :drag-event-origin="dragEventOrigin"
          :image-width="cardWidth"
          :info="character"
          card
          @mouse-in-second-quadrant="onMouseInSecondQuadrant" />
      </div>
      <slot v-else name="empty" />
    </div>
  </div>
</template>

<style module lang="scss">
.invisible {
  aspect-ratio: var(--card-aspect-ratio);
  pointer-events: none;
  position: absolute;
  visibility: hidden;
  width: calc(v-bind(cardWidth) * 1px);
}

.drop {
  min-height: calc(v-bind(minHeight) * 1px);
  position: relative;
  z-index: 0;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
}
</style>
