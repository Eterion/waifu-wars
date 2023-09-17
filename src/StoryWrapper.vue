<script setup lang="ts">
import type { Story, Variant } from 'histoire';

defineProps<{
  story: Story;
  variant: Variant;
}>();
</script>

<template>
  <div style="padding: 24px">
    <slot />
  </div>
</template>
