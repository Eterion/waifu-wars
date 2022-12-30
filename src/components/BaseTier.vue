<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import type { Character } from '@/types/Character';
import type { Tier } from '@/types/Tier';
import { useElementHover, useMouseInElement } from '@vueuse/core';
import { computed, ref } from 'vue';
import BaseCharacter from './BaseCharacter.vue';
import CharacterCardPlaceholder from './CharacterCardPlaceholder.vue';
import TrashIcon from './icons/TrashIcon.vue';

const props = defineProps<{
  /**
   * Tier information.
   */
  info: Tier;
}>();

const IMAGE_WIDTH = 75;
const tierStore = useTierStore();
const captionRef = ref<HTMLElement>();
const captionHovered = useElementHover(captionRef);

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
  if (confirm(`Remove tier ${props.info.caption}?`))
    tierStore.removeTier(props.info.id);
}

const draggingCharacterStore = useDraggingCharacterStore();
const rootRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(rootRef);

const isInDropZone = computed(() => {
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
  <div ref="rootRef" :class="[$style.el, { [$style.active]: isInDropZone }]">
    <div ref="captionRef" :class="$style.caption">
      <div
        :class="[$style.tier, $style[info.color]]"
        contenteditable
        @blur="onCaptionChange">
        {{ caption }}
      </div>
      <button
        v-if="captionHovered"
        :class="$style.remove"
        type="button"
        @click="removeTier">
        <TrashIcon :size="18" />
      </button>
    </div>
    <div :class="$style.characters">
      <BaseCharacter
        v-for="tierCharacter in tierCharacters"
        :key="tierCharacter.id"
        :image-width="IMAGE_WIDTH"
        :info="tierCharacter"
        card
        drag-event-origin="tier" />
      <CharacterCardPlaceholder
        v-if="isInDropZone"
        :image-width="IMAGE_WIDTH" />
    </div>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;
@use 'sass:map';

.el {
  align-items: center;
  column-gap: 12px;
  display: flex;
  position: relative;
  z-index: 0;

  &::before {
    border-radius: inherit;
    border-radius: 12px;
    content: '';
    display: block;
    position: absolute -12px;
    z-index: -1;
  }

  &.active {
    &::before {
      background-color: var(--background);
    }
  }
}

.caption {
  align-self: flex-start;
  position: relative;
}

.characters {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 12px;
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
  width: calc(v-bind(IMAGE_WIDTH) * 1px);
  &:focus {
    outline: 2px solid var(--primary);
  }
}

@each $-colors, $-key in $oc-color-list {
  .#{$-key} {
    background-color: map.get($-colors, '6');
  }
}

.remove {
  align-items: center;
  background-color: transparent;
  background-color: var(--foreground);
  border: none;
  border-radius: 50%;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  position: absolute;
  right: left;
  size: 36px;
  top: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    color: var(--danger);
  }
}
</style>
