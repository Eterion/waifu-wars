<script setup lang="ts">
import { useTierStore } from '@/stores/useTier';
import type { Tier } from '@/types/Tier';
import { computed } from 'vue';

const props = defineProps<{
  /**
   * Character image width.
   */
  imageWidth: number;
  /**
   * Tier information.
   */
  info: Tier;
}>();

const tierStore = useTierStore();
const tier = computed(() => tierStore.findById(props.info.id));

const caption = computed({
  get: () => tier.value?.caption,
  set: (caption) => {
    if (tier.value) {
      tier.value.caption = caption;
    }
  },
});

function onCaptionChange(event: Event) {
  if (event.target instanceof HTMLElement) {
    caption.value = event.target.innerText.trim();
    event.target.innerText = caption.value;
  }
}
</script>

<template>
  <div>
    <div
      :class="[$style.el, info.color]"
      contenteditable
      @blur="onCaptionChange">
      {{ caption }}
    </div>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  align-items: center;
  aspect-ratio: var(--card-aspect-ratio);
  border-radius: 12px;
  color: $oc-white;
  display: flex;
  justify-content: center;
  padding: 12px;
  text-align: center;
  width: calc(v-bind(imageWidth) * 1px);
  &:focus {
    outline: 2px solid var(--primary-surface);
  }
}
</style>
