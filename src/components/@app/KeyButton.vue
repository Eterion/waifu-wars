<script setup lang="ts">
import type { MaybeArray } from '@/types/utility/MaybeArray';
import { useEventListener } from '@vueuse/core';
import { castArray } from 'lodash-es';
import { computed } from 'vue';
import KeyCap from './KeyCap.vue';

const props = defineProps<{
  /** Event key. */
  eventKey: MaybeArray<KeyboardEvent['key']>;
}>();

const emit = defineEmits<{
  (e: 'event'): void;
}>();

const keyCaption = computed(() => {
  const value = castArray(props.eventKey).at(0);
  if (value === 'Escape') return 'Esc';
  return value;
});

useEventListener('keydown', (event) => {
  if (castArray(props.eventKey).includes(event.key)) {
    emit('event');
  }
});
</script>

<template>
  <button type="button" :class="$style.el" @click="$emit('event')">
    <slot />
    <KeyCap>{{ keyCaption }}</KeyCap>
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
  line-height: inherit;
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
