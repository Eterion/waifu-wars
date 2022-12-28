<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import type { Character } from '@/types/Character';
import type { Tier } from '@/types/Tier';
import { useMouseInElement } from '@vueuse/core';
import { computed, ref } from 'vue';
import BaseCharacter from './BaseCharacter.vue';
import TrashIcon from './icons/TrashIcon.vue';

const props = defineProps<{
  /**
   * Tier information.
   */
  info: Tier;
}>();

const CHARACTER_WIDTH = 100;
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

function onCaptionChange(event: Event) {
  if (event.target instanceof HTMLElement) {
    caption.value = event.target.innerText.trim();
    event.target.innerText = caption.value;
  }
}

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
    <div
      :class="[$style.tier, $style[info.color]]"
      contenteditable
      @blur="onCaptionChange">
      {{ caption }}
    </div>
    <div :class="$style.characters">
      <BaseCharacter
        v-for="tierCharacter in tierCharacters"
        :key="tierCharacter.id"
        :image-width="CHARACTER_WIDTH"
        :info="tierCharacter"
        card
        drag-event-origin="tier" />
    </div>
    <div>
      <button :class="$style.removeButton" type="button" @click="removeTier">
        <TrashIcon :size="18" />
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;
@use 'sass:map';

.el {
  align-items: center;
  border-radius: 12px;
  column-gap: 12px;
  display: flex;
  padding: 24px;
  transition-duration: 150ms;
  transition-property: background-color;
  &.drop {
    background-color: var(--drop);
  }
}

.tier {
  align-items: center;
  aspect-ratio: var(--aspect-ratio);
  border-radius: 12px;
  color: $oc-white;
  display: flex;
  justify-content: center;
  padding: 12px;
  text-align: center;
  width: calc(v-bind(CHARACTER_WIDTH) * 1px);
  &:focus {
    outline: 2px solid var(--primary);
  }
}

@each $-colors, $-key in $oc-color-list {
  .#{$-key} {
    background-color: map.get($-colors, '6');
  }
}

.characters {
  display: flex;
  flex-grow: 1;
  gap: 12px;
}

.removeButton {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 12px;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  size: 46px;
  &:hover {
    color: var(--danger);
  }
}
</style>
