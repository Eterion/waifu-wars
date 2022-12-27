<script setup lang="ts">
import { useCharacterDragStore } from '@/stores/useCharacterDrag';
import { useCharactersStore } from '@/stores/useCharacters';
import { useTierStore } from '@/stores/useTier';
import { useMouseInElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import BaseCharacter from './BaseCharacter.vue';

const characterDragStore = useCharacterDragStore();
const dropRref = ref<HTMLElement>();
const { isOutside } = useMouseInElement(dropRref);
const isInDropArea = computed(() => {
  return characterDragStore.dragging && !isOutside.value;
});

const tierStore = useTierStore();
const charactersStore = useCharactersStore();
const { reset } = charactersStore;
const { characters } = storeToRefs(charactersStore);
const filteredCharacters = computed(() => {
  return characters.value.filter(({ id }) => {
    return (
      id !== characterDragStore.dragging?.character.id &&
      !tierStore.tiers
        .flatMap(({ characterIds }) => characterIds || [])
        .includes(id)
    );
  });
});

characterDragStore.onDrop(({ dragInfo }) => {
  if (!isOutside.value) {
    if (dragInfo.origin === 'search') {
      const { id, ...info } = dragInfo.character;
      charactersStore.saveCharacter(id, info);
    } else if (dragInfo.origin === 'tier') {
      tierStore.removeCharacter(dragInfo.character.id);
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
  background-color: $oc-gray-2;
}

.cards {
  column-gap: 12px;
  display: flex;
  list-style: none;
  padding: 0;
}
</style>
