<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type OpenColor from 'open-color';

const props = defineProps<{
  /**
   * Controls active state.
   */
  active?: boolean;
  /**
   * Color.
   */
  color: Exclude<keyof OpenColor, 'black' | 'white'>;
}>();

const emit = defineEmits<{
  (e: 'update:active', active?: boolean): void;
}>();

const active = useVModel(props, 'active', emit);
</script>

<template>
  <button
    :class="[$style.el, $style[color], { [$style.active]: active }]"
    type="button"
    @click="active = !active">
    <slot />
  </button>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;
@use 'sass:math';
@use 'sass:map';

$-height: 30px;

.el {
  align-items: center;
  background-color: var(--gray);
  border: none;
  border-radius: math.div($-height, 2);
  cursor: pointer;
  display: flex;
  font-size: 0.8125rem;
  height: $-height;
  justify-content: center;
  opacity: 0.65;
  padding: 0 10px;
  transition-duration: 150ms;
  transition-property: background-color, color, opacity;

  &:hover {
    opacity: 1;
  }

  &.active {
    background-color: var(--chip-bg);
    color: var(--chip-text);
    opacity: 1;
  }
}

@each $-colors, $-key in $oc-color-list {
  .#{$-key} {
    &.active {
      --chip-bg: #{map.get($-colors, '7')};
      --chip-text: #{$oc-white};
      :global(.dark) & {
        @if ($-key == 'gray') {
          --chip-bg: #{$oc-white};
          --chip-text: #{$oc-black};
        } @else {
          --chip-bg: #{map.get($-colors, '5')};
        }
      }
    }
  }
}
</style>
