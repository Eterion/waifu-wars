<script setup lang="ts">
import type { ApolloError } from '@apollo/client';

defineProps<{
  /** Error value. */
  error: ApolloError;
}>();
</script>

<template>
  <div :class="$style.el">
    <div :class="$style.name">{{ error.name }}</div>
    <p :class="$style.message">{{ error.message }}</p>
  </div>
</template>

<style module lang="scss">
.el {
  color: var(--danger);
}

.name {
  font-size: 1.25rem;
}

.message {
  margin: 0;
}
</style>
