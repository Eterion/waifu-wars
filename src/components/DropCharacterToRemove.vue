<script setup lang="ts">
import { useCharacterDragStore } from '@/stores/useCharacterDrag';
import { useCharactersStore } from '@/stores/useCharacters';
import { useMouseInElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const rootRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(rootRef);
const charactersStore = useCharactersStore();
const characterDragStore = useCharacterDragStore();
const { dragging } = storeToRefs(characterDragStore);

const isCharacterSaved = computed(() => {
  if (dragging.value) {
    const { character, origin } = dragging.value;
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

characterDragStore.onDrop(({ dragInfo }) => {
  if (!isOutside.value) {
    switch (dragInfo.origin) {
      case 'character':
      case 'tier':
        charactersStore.removeCharacter(dragInfo.character.id);
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
