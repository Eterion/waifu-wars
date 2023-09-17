<script setup lang="ts">
import CheckIcon from '../@icons/CheckIcon.vue';

defineProps<{
  /** Checked state. */
  checked?: boolean;
  /** Image url. */
  image: string;
  /** Name. */
  name: string;
}>();
</script>

<template>
  <button type="button" :class="[$style.el, { [$style.checked]: checked }]">
    <img :class="$style.img" :src="image" alt="" />
    <div :class="$style.name">{{ name }}</div>
    <div :class="$style.check">
      <CheckIcon v-if="checked" :size="12" :stroke-width="3" />
    </div>
  </button>
</template>

<style module lang="scss">
.img {
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  display: block;
  margin-bottom: 12px;
  object-fit: cover;
  width: 100%;
}

.check {
  align-items: center;
  background-color: var(--foreground);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  opacity: 0;
  position: absolute;
  right: 6px;
  size: 24px;
  top: 6px;
}

.el {
  background-color: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  padding: 0;
  position: relative;
  text-align: left;
  transition-duration: 200ms;
  transition-property: transform;

  &:hover {
    .check {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.9);
  }

  &.checked {
    .img {
      border: 2px solid var(--primary);
      filter: grayscale(1);
    }
    .check {
      background-color: var(--primary-surface);
      color: var(--text-on-primary-surface);
      opacity: 1;
    }
  }
}
</style>
