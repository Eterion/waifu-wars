<script setup lang="ts">
import { useTiersStore } from '@/stores/useTiers';
import type { Tier } from '@/types/Tier';
import { useElementSize } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  /**
   * Tier info.
   */
  info: Tier;
}>();

const emit = defineEmits<{
  (e: 'captionWidthChange', width: number): void;
}>();

const rootRef = ref<HTMLElement>();
const { width: meassuredWidth } = useElementSize(rootRef);
watch(meassuredWidth, (width) => void emit('captionWidthChange', width + 48));
const tiersStore = useTiersStore();
const tier = computed(() => tiersStore.findById(props.info.id));

const caption = computed({
  get: () => tier.value?.caption,
  set: (caption) => {
    if (tier.value) {
      tier.value.caption = caption;
    }
  },
});

function onCaptionChange(event: Event) {
  console.log('onCaptionChange');
  if (event.target instanceof HTMLElement) {
    caption.value = event.target.innerText.trim();
    event.target.innerText = caption.value;
  }
}
</script>

<template>
  <div :class="$style.el">
    <div ref="rootRef">
      <div :class="$style.caption" contenteditable @blur="onCaptionChange">
        {{ caption }}
      </div>
      <div :class="$style.tier">Tier</div>
    </div>
  </div>
</template>

<style module lang="scss">
.el {
  align-items: center;
  display: flex;
  line-height: 1.3;
  padding: 12px 24px;
}

.caption {
  color: currentColor;
  font-size: 1.25rem;
  font-weight: semibold;
}

.tier {
  color: var(--text-light);
  font-size: 0.875rem;
}
</style>
