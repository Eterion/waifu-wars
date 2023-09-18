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
    <polyline points="6 9 12 15 18 9" />
  </svg>
</template>
