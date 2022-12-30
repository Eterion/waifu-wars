<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import { useMouseInElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import BaseButton from '../BaseButton.vue';
import BaseCharacter from '../BaseCharacter.vue';
import CharacterCardPlaceholder from '../CharacterCardPlaceholder.vue';

const IMAGE_WIDTH = 75;
const draggingCharacterStore = useDraggingCharacterStore();
const dropRref = ref<HTMLElement>();
const { isOutside } = useMouseInElement(dropRref);
const isInDropZone = computed(() => {
  return draggingCharacterStore.draggingInfo && !isOutside.value;
});

const tierStore = useTierStore();
const charactersStore = useCharactersStore();
const { reset } = charactersStore;
const { characters } = storeToRefs(charactersStore);
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
    <BaseButton @click="reset">Reset characters</BaseButton>
    <div
      ref="dropRref"
      :class="[$style.drop, { [$style.active]: isInDropZone }]">
      <ul v-if="filteredCharacters.length" :class="$style.cards">
        <li v-for="character in filteredCharacters" :key="character.id">
          <BaseCharacter
            :image-width="IMAGE_WIDTH"
            :info="character"
            card
            drag-event-origin="character" />
        </li>
        <li>
          <CharacterCardPlaceholder
            v-if="isInDropZone"
            :image-width="IMAGE_WIDTH" />
        </li>
      </ul>
      <div v-else>Drop character here to save into list</div>
    </div>
  </div>
</template>

<style module lang="scss">
.drop {
  min-height: calc(v-bind(IMAGE_WIDTH) * (1 + (1 - var(--aspect-ratio))) * 1px);
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

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
}
</style>
