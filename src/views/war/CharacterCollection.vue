<script setup lang="ts">
import BaseButton from '@/components/@base/button/BaseButton.vue';
import CharacterCard from '@/components/CharacterCard.vue';
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTiersStore } from '@/stores/useTiers';
import type { Character } from '@/types/Character';
import type { DragEventOrigin } from '@/types/DragEventOrigin';
import { confirm } from '@/utils/confirm';
import { useElementSize, useMouseInElement } from '@vueuse/core';
import { remove } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const IMAGE_WIDTH = 75;
const draggingCharacterStore = useDraggingCharacterStore();
const dropZoneRef = ref<HTMLElement>();
const placeholderRef = ref<HTMLElement>();
const { height: minHeight } = useElementSize(placeholderRef);

const tiersStore = useTiersStore();
const charactersStore = useCharactersStore();
const { characters } = storeToRefs(charactersStore);
const characterCount = computed(() => characters.value.length);

async function resetSaved() {
  if (
    await confirm(
      'All saved characters will be removed and tiers cleared. Tier configuration will be preserved. Reset characters?',
    )
  )
    charactersStore.reset();
}

const filteredCharacters = computed(() => {
  return characters.value.filter(({ id }) => {
    return (
      id !== draggingCharacterStore.draggingInfo?.character.id &&
      !tiersStore.tiers
        .flatMap(({ characterIds }) => characterIds || [])
        .includes(id)
    );
  });
});

const { isOutside: isOutsideOfDropZone } = useMouseInElement(dropZoneRef);
const isInDropZone = computed(() => {
  return draggingCharacterStore.draggingInfo && !isOutsideOfDropZone.value;
});

const idPlacementCandidates = ref<number[]>([]);
function onMouseInSecondQuadrant(id: number, isInQuadrant: boolean) {
  if (isInQuadrant) idPlacementCandidates.value.push(id);
  else remove(idPlacementCandidates.value, (value) => value === id);
}

const charactersWithDragged = computed(() => {
  const arr = filteredCharacters.value.map<{
    character: Character;
    dragEventOrigin?: DragEventOrigin;
  }>((character) => ({
    character,
    dragEventOrigin: 'character',
  }));
  if (draggingCharacterStore.draggingInfo)
    if (isInDropZone.value) {
      const index = arr.findIndex(({ character }) => {
        return idPlacementCandidates.value.includes(character.id);
      });
      arr.splice(index, 0, {
        character: draggingCharacterStore.draggingInfo.character,
      });
    }
  return arr;
});

draggingCharacterStore.onDrop(({ draggingInfo }) => {
  if (!isOutsideOfDropZone.value) {
    if (draggingInfo.origin === 'search') {
      const { id, ...info } = draggingInfo.character;
      charactersStore.saveCharacter(id, info);
    } else if (draggingInfo.origin === 'tier') {
      tiersStore.removeCharacter(draggingInfo.character.id);
    }
  }
});
</script>

<template>
  <div>
    <div :class="$style.buttons">
      <BaseButton @click="resetSaved">Reset characters</BaseButton>
    </div>
    {{ idPlacementCandidates }}
    <div
      ref="dropZoneRef"
      :class="[$style.drop, { [$style.active]: isInDropZone }]">
      <div ref="placeholderRef" :class="$style.placeholder" />
      <div v-if="charactersWithDragged.length" :class="$style.cards">
        <CharacterCard
          v-for="{ character, dragEventOrigin } in charactersWithDragged"
          :key="character.id"
          :drag-event-origin="dragEventOrigin"
          :image-width="IMAGE_WIDTH"
          :info="character"
          card
          @mouse-in-second-quadrant="onMouseInSecondQuadrant" />
      </div>
      <div v-else :class="$style.empty">
        <div>
          <div>Drop a character here or in a tier to save into a list</div>
          <div :class="$style.characterCount">
            Your have {{ characterCount }} saved characters placed in various
            tiers
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.buttons {
  margin-bottom: 24px;
}

.drop {
  min-height: calc(v-bind(minHeight) * 1px);
  position: relative;
  z-index: 0;

  &::before {
    border-radius: inherit;
    border-radius: 12px;
    content: '';
    display: block;
    pointer-events: none;
    position: absolute -12px;
    z-index: -1;
  }

  &.active {
    &::before {
      background-color: var(--background);
    }
  }
}

.placeholder {
  aspect-ratio: var(--card-aspect-ratio);
  pointer-events: none;
  position: absolute;
  visibility: hidden;
  width: calc(v-bind(IMAGE_WIDTH) * 1px);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
}

.empty {
  align-items: center;
  border: 1px dashed var(--border);
  border-radius: 12px;
  display: flex;
  height: calc(v-bind(minHeight) * 1px);
  justify-content: center;
  line-height: 1.4;
  text-align: center;
}

.characterCount {
  color: var(--text-light);
  font-size: 0.875rem;
}
</style>
