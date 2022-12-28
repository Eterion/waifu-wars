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
    <polyline points="20 6 9 17 4 12" />
  </svg>
</template>
