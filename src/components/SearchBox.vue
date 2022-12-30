<script setup lang="ts">
import { useEventListener, useVModel } from '@vueuse/core';
import { computed, ref } from 'vue';
import SearchIcon from './icons/SearchIcon.vue';

const props = defineProps<{
  /**
   * Model value.
   */
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue?: string): void;
}>();

const inputRef = ref<HTMLInputElement>();
const focused = ref(false);
const modelValue = useVModel(props, 'modelValue', emit);

const isKeyVisible = computed(() => {
  return !focused.value;
});

function clear() {
  modelValue.value = undefined;
}

useEventListener(document, 'keydown', (event) => {
  if (['Esc', 'Escape'].includes(event.key)) {
    clear();
  } else if (event.ctrlKey && event.key === 'k') {
    event.preventDefault();
    inputRef.value?.focus();
  }
});
</script>

<template>
  <label :class="[$style.el, { [$style.focused]: focused }]">
    <span :class="$style.icon">
      <SearchIcon :size="20" />
    </span>
    <input
      ref="inputRef"
      v-model="modelValue"
      type="search"
      placeholder="Search character or anime..."
      :class="$style.input"
      @focus="focused = true"
      @blur="focused = false" />
    <span v-if="isKeyVisible" :class="$style.key">^K</span>
  </label>
</template>

<style module lang="scss">
$-height: 52px;

.el {
  align-items: center;
  background-color: var(--gray);
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  display: flex;

  &:hover {
    border-color: var(--border);
  }

  &.focused {
    background-color: var(--foreground);
    border-color: var(--primary);
    outline: 1px solid var(--primary);
  }
}

.icon {
  align-items: center;
  color: var(--text-light);
  display: flex;
  justify-content: center;
  size: $-height;
}

.input {
  background-color: transparent;
  border: none;
  flex-grow: 1;
  font: inherit;
  height: $-height;
  outline: none;
  padding: 0;

  &::-webkit-search-cancel-button {
    display: none;
  }

  &::placeholder {
    color: var(--disabled);
    opacity: 1;
  }
}

.key {
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8125rem;
  font-weight: semibold;
  margin-right: 10px;
  padding: 3px 6px;
}
</style>
