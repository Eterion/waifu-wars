<script setup lang="ts">
import { iconProps, useIcon } from '@/composables/useIcon';

const props = defineProps(iconProps);
const { height, width } = useIcon(props);
</script>

<template>
  <svg
    :height="height"
    :width="width"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </svg>
</template>
