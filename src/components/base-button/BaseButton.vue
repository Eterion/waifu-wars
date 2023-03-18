<script setup lang="ts">
import { computed, useCssModule } from 'vue';

const props = defineProps<{
  /**
   * Danger style.
   */
  danger?: boolean;
  /**
   * Primary style.
   */
  primary?: boolean;
}>();

const $style = useCssModule();
const css = computed(() => {
  if (props.danger) return $style.danger;
  else if (props.primary) return $style.primary;
  return $style.regular;
});
</script>

<template>
  <button type="button" :class="[$style.el, css]">
    <slot />
  </button>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  height: 46px;
  padding: 0 24px;
  transition-duration: 150ms;
  transition-property: background-color, box-shadow, color, transform;
  &:active {
    transform: scale(0.9);
  }
}

.regular {
  background-color: var(--foreground);
  color: var(--text);
  &:hover {
    box-shadow: 0 0 12px var(--text);
  }
}

.danger {
  background-color: var(--danger-surface);
  color: var(--text-on-danger-surface);
  &:hover {
    box-shadow: 0 0 12px var(--danger-surface);
  }
}

.primary {
  background-color: var(--primary-surface);
  color: var(--text-on-primary-surface);
  &:hover {
    box-shadow: 0 0 12px var(--primary-surface);
  }
}
</style>
