<template>
  <button type="button" :class="$style.el">
    <slot />
  </button>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  background-color: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  height: 36px;
  padding: 0 12px;
  transition-duration: 150ms;
  transition-property: background-color, border-color, color, transform;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    background-color: var(--primary-surface);
    border-color: transparent;
    color: var(--text-on-primary-surface);
  }
}
</style>
