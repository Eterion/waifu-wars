<script setup lang="ts">
import BaseButton from '@/components/base-button/BaseButton.vue';
import CharacterCard from '@/components/CharacterCard.vue';
import CharacterCardPlaceholder from '@/components/CharacterCardPlaceholder.vue';
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import { confirm } from '@/utils/confirm';
import { useElementSize, useMouseInElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const IMAGE_WIDTH = 75;
const draggingCharacterStore = useDraggingCharacterStore();
const dropRref = ref<HTMLElement>();
const { isOutside } = useMouseInElement(dropRref);
const placeholderRef = ref<HTMLElement>();
const { height: minHeight } = useElementSize(placeholderRef);

const isInDropZone = computed(() => {
  return draggingCharacterStore.draggingInfo && !isOutside.value;
});

const tierStore = useTierStore();
const charactersStore = useCharactersStore();
const { characters } = storeToRefs(charactersStore);
const characterCount = computed(() => characters.value.length);

async function resetSaved() {
  if (
    await confirm(
      'All saved characters will be removed and tiers cleared. Tier configuration will be preserved. Reset characters?'
    )
  )
    charactersStore.reset();
}

const filteredCharacters = computed(() => {
  return characters.value.filter(({ id }) => {
    return (
      id !== draggingCharacterStore.draggingInfo?.character.id &&
      !tierStore.tiers
        .flatMap(({ characterIds }) => characterIds || [])
        .includes(id)
    );
  });
});

draggingCharacterStore.onDrop(({ draggingInfo }) => {
  if (!isOutside.value) {
    if (draggingInfo.origin === 'search') {
      const { id, ...info } = draggingInfo.character;
      charactersStore.saveCharacter(id, info);
    } else if (draggingInfo.origin === 'tier') {
      tierStore.removeCharacter(draggingInfo.character.id);
    }
  }
});
</script>

<template>
  <div>
    <div :class="$style.buttons">
      <BaseButton @click="resetSaved">Reset characters</BaseButton>
    </div>
    <div
      ref="dropRref"
      :class="[$style.drop, { [$style.active]: isInDropZone }]">
      <div ref="placeholderRef" :class="$style.placeholder" />
      <div v-if="filteredCharacters.length" :class="$style.cards">
        <CharacterCard
          v-for="character in filteredCharacters"
          :key="character.id"
          :image-width="IMAGE_WIDTH"
          :info="character"
          card
          drag-event-origin="character" />
        <CharacterCardPlaceholder
          v-if="isInDropZone"
          :image-width="IMAGE_WIDTH" />
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
