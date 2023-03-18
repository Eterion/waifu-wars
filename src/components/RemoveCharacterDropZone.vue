<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useMouseInElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const dropZoneRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(dropZoneRef);
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

const text = computed(() => {
  if (isInDropZone.value)
    return `Remove ${draggingInfo.value?.character.fullName}?`;
  return 'Drop here to remove...';
});
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-if="isCharacterSaved" ref="dropZoneRef" :class="$style.el">
        {{ text }}
      </div>
    </Transition>
  </Teleport>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  align-items: center;
  background-color: var(--danger-surface);
  color: $oc-white;
  display: flex;
  font-size: 0.875rem;
  justify-content: center;
  left: 0;
  padding: 12px 0;
  position: fixed;
  right: 0;
  top: 0;

  &:global(.v-enter-from),
  &:global(.v-leave-to) {
    transform: translateY(-100%);
  }

  &:global(.v-enter-active),
  &:global(.v-leave-active) {
    transition-duration: 200ms;
    transition-property: transform;
  }
}
</style>
