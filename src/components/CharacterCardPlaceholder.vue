<script setup lang="ts">
import { computed } from 'vue';
import MinimizeIcon from './icons/MinimizeIcon.vue';

const props = defineProps<{
  /**
   * Image width, in pixels.
   */
  imageWidth: number;
}>();

const imageWidth = computed(() => {
  return `${props.imageWidth}px`;
});
</script>

<template>
  <div :class="$style.el">
    <MinimizeIcon />
  </div>
</template>

<style module lang="scss">
.el {
  align-items: center;
  aspect-ratio: var(--aspect-ratio);
  border: 1px dashed currentColor;
  border-radius: 12px;
  color: var(--text-light);
  display: flex;
  justify-content: center;
  width: v-bind(imageWidth);
}
</style>
