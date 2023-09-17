<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  /** Description text. */
  desc: string;
  /** Title text. */
  title: string;
  /** Thumbnail image url. */
  thumbnail: string;
  /** Route location. */
  to: RouteLocationRaw;
}>();
</script>

<template>
  <RouterLink :to="to" :class="$style.el">
    <div :class="$style.thumbnail">
      <img :class="$style.thumbnail_img" :src="thumbnail" alt="" />
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
