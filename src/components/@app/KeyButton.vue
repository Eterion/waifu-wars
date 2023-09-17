<script setup lang="ts">
import KeyCap from './KeyCap.vue';

defineProps<{
  /** Event key. */
  eventKey: KeyboardEvent['key'];
}>();
</script>

<template>
  <button type="button" :class="$style.el">
    Close
    <KeyCap>{{ eventKey }}</KeyCap>
  </button>
</template>

<style module lang="scss">
.el {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text);
  column-gap: 12px;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 0.875rem;
  padding: 10px 8px 10px 12px;
  transition-duration: 200ms;
  transition-property: background-color, transform;

  &:hover {
    background-color: var(--hover-surface);
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
