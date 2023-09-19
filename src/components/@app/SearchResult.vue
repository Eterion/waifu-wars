<script setup lang="ts">
import type { AnimeInfo } from '@/types/AnimeInfo';
import type { CharacterInfo } from '@/types/CharacterInfo';
import { ref } from 'vue';
import CheckIcon from '../@icons/CheckIcon.vue';
import ContextInfo from './ContextInfo.vue';

defineProps<{
  /** Checked state. */
  checked?: boolean;
  /** Image url. */
  image: string;
  /** Metadata. */
  metadata?: CharacterInfo | AnimeInfo;
  /** Name. */
  name: string;
}>();

const thumbnailRef = ref<HTMLElement>();
</script>

<template>
  <button type="button" :class="[$style.el, { [$style.checked]: checked }]">
    <div ref="thumbnailRef" :class="$style.thumbnail">
      <img :class="$style.thumbnail_img" :src="image" alt="" />
      <ContextInfo
        v-if="metadata"
        :outside-reference-element="thumbnailRef"
        :info="metadata" />
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
    border-radius: 8px;
    display: block;
    object-fit: cover;
    size: 100%;
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

  &:hover {
    .check {
      opacity: 1;
    }
  }

  &.checked {
    .thumbnail {
      border: 2px solid var(--primary);
      padding: 2px;
      &_img {
        filter: grayscale(1);
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
