<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import type { Character } from '@/types/Character';
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

const draggingCharacterStore = useDraggingCharacterStore();
const rootRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(rootRef);
const isInDropArea = computed(() => {
  return draggingCharacterStore.draggingInfo && !isOutside.value;
});
draggingCharacterStore.onDrop(({ draggingInfo }) => {
  if (!isOutside.value) {
    if (draggingInfo.origin === 'search') {
      const { id, ...info } = draggingInfo.character;
      charactersStore.saveCharacter(id, info);
    }
    tierStore.moveOrAddCharacter({
      characterId: draggingInfo.character.id,
      tierId: props.info.id,
    });
  }
});

const charactersStore = useCharactersStore();
const tierCharacters = computed(() => {
  return (props.info.characterIds || []).reduce<Character[]>((arr, id) => {
    const character = charactersStore.characters.find(({ id: _id }) => {
      return _id === id;
    });
    if (character) arr.push(character);
    return arr;
  }, []);
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
      :image-width="100"
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
    background-color: $oc-black;
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
