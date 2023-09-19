<script setup lang="ts">
import SearchIcon from '@/components/@icons/SearchIcon.vue';
import XIcon from '@/components/@icons/XIcon.vue';
import { useField } from '@/composables/useField';
import { useElementHover, useFocusWithin } from '@vueuse/core';
import { computed, ref } from 'vue';

const props = defineProps<{
  /** Model value. */
  modelValue?: string;
  /** Enables search appearance. */
  search?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue?: string): void;
}>();

const { id } = useField();
const editorRef = ref<HTMLElement>();
const hovered = useElementHover(editorRef);
const { focused } = useFocusWithin(editorRef);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value || undefined);
  },
});

const inputRef = ref<HTMLInputElement>();
function onClear() {
  modelValue.value = undefined;
  inputRef.value?.focus();
}
</script>

<template>
  <div
    ref="editorRef"
    :class="[
      $style.el,
      { [$style.hovered]: hovered, [$style.focused]: focused },
    ]">
    <label v-if="search" :for="id" :class="$style.search">
      <SearchIcon :size="18" :stroke-width="1.5" />
    </label>
    <input
      :id="id"
      ref="inputRef"
      v-model="modelValue"
      :class="$style.input"
      type="text" />
    <button
      v-if="modelValue"
      :class="$style.button"
      type="button"
      tabindex="-1"
      @click="onClear">
      <XIcon :size="18" :stroke-width="1.5" />
    </button>
  </div>
</template>

<style module lang="scss">
.input {
  background-color: transparent;
  border: none;
  border-radius: inherit;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
  padding: 8px 12px;
  width: 100%;
}

.search {
  align-items: center;
  align-self: stretch;
  color: var(--text-light);
  display: flex;
  justify-content: center;
  padding-left: 12px;
}

.button {
  align-items: center;
  align-self: stretch;
  background-color: transparent;
  border: none;
  border-radius: inherit;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: false 12px;
}

.el {
  align-items: center;
  background-color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  &.hovered {
    border-color: var(--border-dark);
    .button {
      color: var(--text);
    }
  }
  &.focused {
    border-color: var(--primary);
    outline: 1px solid var(--primary);
  }
}
</style>
