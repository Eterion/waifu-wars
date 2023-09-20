<script setup lang="ts">
import { isAnimeInfo, type AnimeInfo } from '@/types/AnimeInfo';
import { isCharacterInfo, type CharacterInfo } from '@/types/CharacterInfo';
import { computed, ref } from 'vue';
import ContextInfo from './ContextInfo.vue';

const props = defineProps<{
  /** Faded state. */
  faded?: boolean;
  /** Image url. */
  image: string;
  /** Metadata. */
  metadata?: CharacterInfo | AnimeInfo;
  /** Name. */
  name: string;
  /** Shows remove button. */
  removable?: boolean;
}>();

defineEmits<{
  (e: 'remove', metadata: CharacterInfo | AnimeInfo): void;
}>();

const rootRef = ref<HTMLElement>();
const tooltipText = computed(() => {
  const animeName = (() => {
    if (isCharacterInfo(props.metadata)) return props.metadata.animeName;
    else if (isAnimeInfo(props.metadata)) return props.metadata.name;
    return undefined;
  })();
  return props.name + (animeName ? ` (${animeName})` : '');
});
</script>

<template>
  <div
    ref="rootRef"
    :class="[$style.el, { [$style.faded]: faded }]"
    :title="tooltipText">
    <img :class="$style.img" :src="image" alt="" />
    <ContextInfo
      v-if="metadata"
      :outside-reference-element="rootRef"
      :info="metadata"
      :removable="removable"
      @remove="$emit('remove', $event)" />
  </div>
</template>

<style module lang="scss">
.el {
  cursor: move;
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
