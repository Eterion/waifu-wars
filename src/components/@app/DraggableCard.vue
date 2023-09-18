<script setup lang="ts">
import { type AnimeInfo } from '@/types/AnimeInfo';
import { type CharacterInfo } from '@/types/CharacterInfo';
import { ref } from 'vue';
import ContextInfo from './ContextInfo.vue';

defineProps<{
  /** Faded state. */
  faded?: boolean;
  /** Image url. */
  image: string;
  /** Metadata. */
  metadata?: CharacterInfo | AnimeInfo;
  /** Name. */
  name: string;
}>();

const rootRef = ref<HTMLElement>();
</script>

<template>
  <div
    ref="rootRef"
    :class="[$style.el, { [$style.faded]: faded }]"
    :title="name">
    <img :class="$style.img" :src="image" alt="" />
    <ContextInfo
      v-if="metadata"
      :outside-reference-element="rootRef"
      :info="metadata" />
  </div>
</template>

<style module lang="scss">
.el {
  cursor: pointer;
  width: 75px;
  &.faded {
    filter: grayscale(1);
    opacity: 0.3;
  }
}

.img {
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  display: block;
  object-fit: cover;
  width: 100%;
}
</style>
