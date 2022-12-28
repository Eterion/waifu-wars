<script setup lang="ts">
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import {
  useElementSize,
  useEventListener,
  useMouse,
  useScroll,
} from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import BaseCharacter from './BaseCharacter.vue';

const IMAGE_WIDTH = 100;
const draggingRef = ref<HTMLElement>();
const { height, width } = useElementSize(draggingRef, { height: 0, width: 0 });
const draggingCharacterStore = useDraggingCharacterStore();
const { draggingInfo } = storeToRefs(draggingCharacterStore);
const mouse = reactive(useMouse());
const documentScroll = reactive(useScroll(document));

const translateX = computed(() => {
  return `${mouse.x - documentScroll.x - width.value / 2}px`;
});

const translateY = computed(() => {
  return `${mouse.y - documentScroll.y - height.value / 2}px`;
});

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
      ref="draggingRef"
      :class="$style.el"
      :drag-event-origin="false"
      :image-width="IMAGE_WIDTH"
      :info="draggingCharacter"
      card />
  </Teleport>
</template>

<style module lang="scss">
.el {
  aspect-ratio: var(--aspect-ratio);
  position: fixed 0;
  transform: translate(v-bind(translateX), v-bind(translateY));
  width: calc(v-bind(IMAGE_WIDTH) * 1px);
}
</style>
