<script setup lang="ts">
import { useIcon } from '@/composables/useIcon';
import type { IconProps } from '@/types/IconProps';

const props = defineProps<IconProps>();
const { height, width, strokeWidth } = useIcon(props);
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
</template>
