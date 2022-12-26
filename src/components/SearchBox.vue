<script setup lang="ts">
import { useEventListener, useVModel } from '@vueuse/core';
import { ref } from 'vue';
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
const modelValue = useVModel(props, 'modelValue', emit);
useEventListener(document, 'keydown', (event) => {
  if (event.ctrlKey && event.key === 'k') {
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
      <span>Ctrl K</span>
    </label>
  </div>
</template>
