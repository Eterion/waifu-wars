<script setup lang="ts">
import { useEventListener, useVModel } from '@vueuse/core';
import { computed, ref } from 'vue';
import SearchIcon from './icons/SearchIcon.vue';
import XIcon from './icons/XIcon.vue';

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
const modelValue = useVModel(props, 'modelValue', emit);

const isClearVisible = computed(() => {
  return !!modelValue.value;
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
  <div>
    <label>
      <SearchIcon />
      <input
        ref="inputRef"
        v-model="modelValue"
        type="search"
        placeholder="Search..." />
      <button v-if="isClearVisible" type="button" @click="clear">
        <XIcon />
      </button>
      <span>Ctrl K</span>
    </label>
  </div>
</template>
