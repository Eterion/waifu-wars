<script setup lang="ts">
import { defineField } from '@/composables/useField';

const props = defineProps<{
  /** Field id. */
  id?: string;
  /** Label text. */
  label: string;
}>();

const { id, label } = defineField(props);
</script>

<template>
  <div>
    <div :class="$style.label">
      <label :for="id">{{ label }}</label>
    </div>
    <slot />
  </div>
</template>

<style module lang="scss">
.label {
  color: var(--text-light);
  font-size: 0.875rem;
  margin-bottom: 3px;
}
</style>
