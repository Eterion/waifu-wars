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
    <div :class="$style.thumbnail">
      <img :class="$style.thumbnail_img" :src="image" alt="" />
    </div>
    <div :class="$style.name">{{ name }}</div>
    <div :class="$style.check">
      <CheckIcon v-if="checked" :size="12" :stroke-width="3" />
    </div>
  </button>
</template>

<style module lang="scss">
.thumbnail {
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  &_img {
    display: block;
    object-fit: cover;
    width: 100%;
  }
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
    .thumbnail {
      border: 2px solid var(--primary);
      &_img {
        filter: grayscale(1);
        opacity: 0.3;
      }
    }
    .check {
      background-color: var(--primary-surface);
      color: var(--text-on-primary-surface);
      opacity: 1;
    }
  }
}
</style>
