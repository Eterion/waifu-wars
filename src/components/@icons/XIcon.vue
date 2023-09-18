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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
</template>
