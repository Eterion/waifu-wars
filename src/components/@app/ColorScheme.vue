<script setup lang="ts">
import { useColorSchemeStore } from '@/stores/useColorSchemeStore';
import { storeToRefs } from 'pinia';
import MoonIcon from '../@icons/MoonIcon.vue';
import SunIcon from '../@icons/SunIcon.vue';

const colorSchemeStore = useColorSchemeStore();
const { toggle } = colorSchemeStore;
const { isDark } = storeToRefs(colorSchemeStore);
</script>

<template>
  <button type="button" :class="$style.el" @click="toggle()">
    <span :class="{ [$style.dark]: isDark }">
      <MoonIcon v-if="isDark" :size="12" />
      <SunIcon v-else :size="12" />
    </span>
  </button>
</template>

<style module lang="scss">
@use 'sass:math';

$-height: 22px;

.el {
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: math.div($-height, 2);
  color: var(--text);
  cursor: pointer;
  display: block;
  height: $-height;
  padding: 0;
  width: $-height * 2 - 2px;

  &:hover {
    border-color: var(--border-dark);
  }

  & > span {
    $-size: $-height - 2px;
    align-items: center;
    background-color: var(--foreground);
    border-radius: $-size;
    display: flex;
    justify-content: center;
    size: $-size;
    transition-duration: 200ms;
    transition-property: transform;

    &.dark {
      transform: translateX(100%);
    }
  }
}
</style>
