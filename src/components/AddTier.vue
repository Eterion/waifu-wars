<script setup lang="ts">
import PlusIcon from './icons/PlusIcon.vue';

defineEmits<{
  (e: 'add'): void;
}>();
</script>

<template>
  <div :class="$style.el">
    <button
      :class="$style.button"
      type="button"
      title="Add Tier"
      @click="$emit('add')">
      <PlusIcon :size="20" />
    </button>
  </div>
</template>

<style module lang="scss">
.el {
  align-items: enter;
  display: flex;
  height: 24px;
  position: relative;
}

.button {
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--border);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  position: absolute;
  right: 100%;
  size: 42px;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    color: var(--text);
  }
}
</style>
