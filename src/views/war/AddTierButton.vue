<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import PlusIcon from '@/components/@icons/PlusIcon.vue';

defineEmits<{
  (e: 'click', event: Event): void;
}>();
</script>

<template>
  <div :class="$style.el">
    <button type="button" :class="$style.button" @click="$emit('click')">
      <PlusIcon :size="20" :stroke-width="1" />
    </button>
  </div>
</template>

<style module lang="scss">
.el {
  background-color: var(--background);
  border-radius: 50%;
  padding: 6px;
  size: 42px;
}

.button {
  align-items: center;
  background-color: var(--foreground);
  border: none;
  border-radius: inherit;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  size: 30px;
}
</style>
