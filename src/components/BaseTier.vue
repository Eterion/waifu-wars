<script setup lang="ts">
import { useCharacterDragStore } from '@/stores/useCharacterDrag';
import { useCharactersStore } from '@/stores/useCharacters';
import { useTierStore } from '@/stores/useTier';
import type { Tier } from '@/types/Tier';
import { useMouseInElement } from '@vueuse/core';
import { computed, ref } from 'vue';
import BaseCharacter from './BaseCharacter.vue';

const props = defineProps<{
  /**
   * Tier information.
   */
  info: Tier;
}>();

const tierStore = useTierStore();
const tier = computed(() => {
  return tierStore.tiers.find(({ id }) => {
    return id === props.info.id;
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
  tierStore.removeTier(props.info.id);
}

const characterDragStore = useCharacterDragStore();
const rootRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(rootRef);
const isInDropArea = computed(() => {
  return characterDragStore.dragging && !isOutside.value;
});
characterDragStore.onDrop(({ dragInfo }) => {
  if (!isOutside.value) {
    tierStore.moveCharacter({
      characterId: dragInfo.character.id,
      tierId: props.info.id,
    });
  }
});

const charactersStore = useCharactersStore();
const tierCharacters = computed(() => {
  return charactersStore.characters.filter(({ id }) => {
    return props.info.characterIds?.includes(id);
  });
});
</script>

<template>
  <div ref="rootRef" :class="[$style.el, { [$style.drop]: isInDropArea }]">
    <div :class="[$style.caption, $style[info.color]]">
      <input v-model.lazy="caption" type="text" />
    </div>
    <BaseCharacter
      v-for="tierCharacter in tierCharacters"
      :key="tierCharacter.id"
      :info="tierCharacter"
      card
      drag-event-origin="tier" />
    <button type="button" @click="removeTier">Remove</button>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;
@use 'sass:map';

.el {
  align-items: center;
  column-gap: 12px;
  display: flex;

  &.drop {
    background-color: $oc-gray-2;
  }
}

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
