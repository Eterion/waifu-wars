<script setup lang="ts">
import { iconProps, useIcon } from '@/composables/useIcon';

const props = defineProps(iconProps);
const { height, width } = useIcon(props);
</script>

<template>
  <svg
    :height="height"
    :stroke-width="strokeWidth"
    :width="width"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
</template>
