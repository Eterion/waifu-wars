<script setup lang="ts">
import type { AnimeInfo } from '@/types/AnimeInfo';
import type { CharacterInfo } from '@/types/CharacterInfo';
import { ref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import ContextInfo from './ContextInfo.vue';

defineProps<{
  /** Description text. */
  desc: string;
  /** Thumbnail metadata. */
  metadata?: CharacterInfo | AnimeInfo;
  /** Title text. */
  title: string;
  /** Thumbnail image url. */
  thumbnail?: string;
  /** Route location. */
  to: RouteLocationRaw;
}>();

const thumbnailRef = ref();
</script>

<template>
  <RouterLink :to="to" :class="$style.el">
    <div ref="thumbnailRef" :class="$style.thumbnail">
      <img
        v-if="thumbnail"
        :class="$style.thumbnail_img"
        :src="thumbnail"
        alt="" />
      <span v-else :class="$style.thumbnail_placeholder" />
      <ContextInfo
        v-if="metadata"
        :info="metadata"
        :outside-reference-element="thumbnailRef" />
    </div>
    <div :class="$style.title">{{ title }}</div>
    <p :class="$style.desc">{{ desc }}</p>
  </RouterLink>
</template>

<style module lang="scss">
.thumbnail {
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  display: block;
  margin-bottom: 24px;
  overflow: hidden;
  width: 100%;
  &_img {
    display: block;
    object-fit: cover;
    size: 100%;
    transition-duration: 200ms;
    transition-property: transform;
  }
  &_placeholder {
    background-color: var(--foreground);
    display: block;
    size: 100%;
  }
}

.title {
  font-size: 1.125rem;
  font-weight: medium;
  margin-bottom: 6px;
  margin-top: 0;
}

.desc {
  color: var(--text-light);
  margin: 0;
}

.el {
  color: var(--text);
  cursor: pointer;
  display: block;
  text-decoration: none;
  &:hover {
    .thumbnail_img {
      transform: scale(1.05);
    }
    .title {
      color: var(--primary);
      text-decoration: underline;
    }
  }
}
</style>
