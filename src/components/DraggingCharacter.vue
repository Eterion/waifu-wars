<script setup lang="ts">
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useEventListener, useMouse } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, reactive } from 'vue';
import BaseCharacter from './BaseCharacter.vue';

const draggingCharacterStore = useDraggingCharacterStore();
const { draggingInfo } = storeToRefs(draggingCharacterStore);
const mouse = reactive(useMouse());
const mouseX = computed(() => `${mouse.x}px`);
const mouseY = computed(() => `${mouse.y}px`);

const draggingCharacter = computed(() => {
  return draggingInfo.value?.character;
});

useEventListener('mouseup', (event) => {
  if (draggingCharacterStore.drop()) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
});
</script>

<template>
  <Teleport to="body">
    <BaseCharacter
      v-if="draggingCharacter"
      :class="$style.el"
      :drag-event-origin="false"
      :info="draggingCharacter"
      card />
  </Teleport>
</template>

<style module lang="scss">
.el {
  position: fixed 0;
  transform: translate(v-bind(mouseX), v-bind(mouseY));
}
</style>
