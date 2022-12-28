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

const isInDropArea = computed(() => {
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
      :class="[$style.el, { [$style.drop]: isInDropArea }]">
      Drop here to remove
    </div>
  </Teleport>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  align-items: center;
  background-color: transparent;
  color: $oc-white;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 32px;
  position: fixed;
  right: 0;
  top: 0;

  &.drop {
    background-color: $oc-red-6;
  }
}
</style>
