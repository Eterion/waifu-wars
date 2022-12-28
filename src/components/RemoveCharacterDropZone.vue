<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useMouseInElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const rootRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(rootRef);
const charactersStore = useCharactersStore();
const draggingCharacterStore = useDraggingCharacterStore();
const { draggingInfo } = storeToRefs(draggingCharacterStore);

const isCharacterSaved = computed(() => {
  if (draggingInfo.value) {
    const { character, origin } = draggingInfo.value;
    return (
      (origin === 'character' || origin === 'tier') &&
      charactersStore.savedCharacterIds.includes(character.id)
    );
  }
  return false;
});

const isInDropZone = computed(() => {
  return isCharacterSaved.value && !isOutside.value;
});

draggingCharacterStore.onDrop(({ draggingInfo }) => {
  if (!isOutside.value) {
    switch (draggingInfo.origin) {
      case 'character':
      case 'tier':
        charactersStore.removeCharacter(draggingInfo.character.id);
    }
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isCharacterSaved"
      ref="rootRef"
      :class="[$style.el, { [$style.active]: isInDropZone }]">
      Drop here to remove
    </div>
  </Teleport>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  align-items: center;
  background-image: linear-gradient(to bottom, var(--gray), transparent);
  color: var(--text-light);
  display: flex;
  font-size: 14px;
  justify-content: center;
  left: 0;
  opacity: 0.75;
  padding: 32px;
  position: fixed;
  right: 0;
  top: 0;
  transition-duration: 200ms;
  transition-property: opacity;
  &.active {
    opacity: 1;
  }
}
</style>
