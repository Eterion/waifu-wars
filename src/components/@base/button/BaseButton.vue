<script setup lang="ts">
defineProps<{
  /** Danger style. */
  danger?: boolean;
  /** Primary style. */
  primary?: boolean;
}>();
</script>

<template>
  <button
    type="button"
    :class="[
      $style.el,
      {
        [$style.danger]: danger,
        [$style.primary]: primary,
      },
    ]">
    <slot />
  </button>
</template>

<style module lang="scss">
.el {
  background-color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  padding: 14px 24px;
  transition-duration: 150ms;
  transition-property: background-color, border-color, color, transform;
  &:hover {
    border-color: var(--border-dark);
  }
  &:active {
    transform: scale(0.9);
  }
}

.danger {
  background-color: var(--danger-surface);
  border: none;
  color: var(--text-on-danger-surface);
  &:hover {
    background-color: var(--danger);
  }
}

.primary {
  background-color: var(--primary-surface);
  border: none;
  color: var(--text-on-primary-surface);
  &:hover {
    background-color: var(--primary);
  }
}
</style>
