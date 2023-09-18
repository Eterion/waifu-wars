<script setup lang="ts">
defineProps<{
  /** Media season. */
  season?: string;
  /** Top n. */
  top?: number;
  /** Year. */
  year?: number;
}>();
</script>

<template>
  <div>
    <pre>{{ $props }}</pre>
  </div>
</template>
