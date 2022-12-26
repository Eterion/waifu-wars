<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  /**
   * Controls active state.
   */
  active?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:active', active?: boolean): void;
}>();

const active = useVModel(props, 'active', emit);
</script>

<template>
  <button type="button" @click="active = !active">
    <slot />
    ({{ active ? 'true' : 'false' }})
  </button>
</template>
