<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import { useMouseInElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import BaseCharacter from '../BaseCharacter.vue';

const draggingCharacterStore = useDraggingCharacterStore();
const dropRref = ref<HTMLElement>();
const { isOutside } = useMouseInElement(dropRref);
const isInDropArea = computed(() => {
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
    <button type="button" @click="reset">Reset characters</button>
    <div ref="dropRref" :class="{ [$style.drop]: isInDropArea }">
      <ul :class="$style.cards">
        <li v-for="character in filteredCharacters" :key="character.id">
          <BaseCharacter :info="character" card drag-event-origin="character" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.drop {
  background-color: $oc-black;
}

.cards {
  column-gap: 12px;
  display: flex;
  list-style: none;
  padding: 0;
}
</style>
