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
    <path
      d="M16.472 3.5H4.1a.6.6 0 00-.6.6v9.8a.6.6 0 00.6.6h2.768a2 2 0 011.715.971l2.71 4.517a1.631 1.631 0 002.961-1.308l-1.022-3.408a.6.6 0 01.574-.772h4.575a2 2 0 001.93-2.526l-1.91-7A2 2 0 0016.473 3.5z" />
    <path d="M7 14.5v-11" />
  </svg>
</template>
