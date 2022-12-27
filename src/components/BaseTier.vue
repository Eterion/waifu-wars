<script setup lang="ts">
import { useTierStore } from '@/stores/useTier';
import { computed } from 'vue';

const props = defineProps<{
  /**
   * Tier id.
   */
  id: number;
}>();

const tierStore = useTierStore();
const tier = computed(() => {
  return tierStore.tiers.find(({ id }) => {
    return id === props.id;
  });
});

const caption = computed({
  get: () => tier.value?.caption,
  set: (caption) => {
    if (tier.value) {
      tier.value.caption = caption;
    }
  },
});

function removeTier() {
  tierStore.removeTier(props.id);
}
</script>

<template>
  <div>
    <template v-if="tier">
      <div :class="[$style.caption, $style[tier?.color]]">
        <input v-model.lazy="caption" type="text" />
      </div>
      <button type="button" @click="removeTier">Remove</button>
    </template>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;
@use 'sass:map';

.caption {
  align-items: center;
  aspect-ratio: 4 / 5;
  color: $oc-white;
  display: flex;
  justify-content: center;
  width: 100px;
}

@each $-colors, $-key in $oc-color-list {
  .#{$-key} {
    background-color: map.get($-colors, '6');
  }
}
</style>
