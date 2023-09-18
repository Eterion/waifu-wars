<script setup lang="ts">
defineProps<{
  /** Media season. */
  season?: string;
  /** Year. */
  year?: number;
}>();
</script>

<template>
  <div>
    <pre>{{ $props }}</pre>
  </div>
</template>
