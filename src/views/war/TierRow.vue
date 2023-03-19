<script setup lang="ts">
import SettingsIcon from '@/components/@icons/SettingsIcon.vue';
import CharacterCard from '@/components/CharacterCard.vue';
import CharacterCardPlaceholder from '@/components/CharacterCardPlaceholder.vue';
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTiersStore } from '@/stores/useTiers';
import type { Character } from '@/types/Character';
import type { Tier } from '@/types/Tier';
import { useMouseInElement } from '@vueuse/core';
import { computed, nextTick, ref } from 'vue';
import TierCaption from './TierCaption.vue';
import TierOptionsModal from './TierOptionsModal.vue';

const props = defineProps<{
  /**
   * Tier info.
   */
  info: Tier;
  /**
   * Minimum caption width, in pixels.
   */
  minCaptionWidth?: number;
}>();

defineEmits<{
  (e: 'captionWidthChange', width: number): void;
}>();

const IMAGE_WIDTH = 75;
const imageWidth = computed(() => `${IMAGE_WIDTH}px`);
const tiersStore = useTiersStore();
const charactersStore = useCharactersStore();
const draggingCharacterStore = useDraggingCharacterStore();
const rootRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(rootRef);
const isTierOptionsModalVisible = ref(false);

const isInDropZone = computed(() => {
  return draggingCharacterStore.draggingInfo && !isOutside.value;
});

draggingCharacterStore.onDrop(({ draggingInfo }) => {
  if (!isOutside.value) {
    const { id, ...info } = draggingInfo.character;
    if (draggingInfo.origin === 'search') {
      charactersStore.saveCharacter(id, info);
    }
    nextTick(() => {
      tiersStore.moveOrAddCharacter({
        characterId: id,
        tierId: props.info.id,
      });
    });
  }
});

const characterList = computed(() => {
  return (props.info.characterIds || []).reduce<Character[]>((arr, id) => {
    const character = charactersStore.findById(id);
    if (character) arr.push(character);
    return arr;
  }, []);
});
</script>

<template>
  <div>
    <div
      ref="rootRef"
      :class="[
        $style.el,
        $style[info.color],
        { [$style.isActive]: isInDropZone },
      ]">
      <TierCaption
        :info="info"
        :class="$style.caption"
        @caption-width-change="$emit('captionWidthChange', $event)" />
      <div :class="$style.characters">
        <CharacterCard
          v-for="character in characterList"
          :key="character.id"
          :image-width="IMAGE_WIDTH"
          :info="character"
          card
          drag-event-origin="tier" />
        <CharacterCardPlaceholder
          v-if="isInDropZone"
          :image-width="IMAGE_WIDTH" />
      </div>
      <button
        type="button"
        :class="$style.options"
        @click="isTierOptionsModalVisible = true">
        <SettingsIcon :stroke-width="1.25" :size="18" />
      </button>
    </div>
    <TierOptionsModal
      v-model:visible="isTierOptionsModalVisible"
      :info="info" />
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;
@use 'sass:map';

.el {
  align-items: stretch;
  background-color: var(--foreground);
  border-radius: 12px;
  display: flex;
  position: relative;

  &::before {
    background-color: currentColor;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    bottom: 12px;
    content: '';
    left: 0;
    position: absolute;
    top: 12px;
    width: 3px;
  }
}

@each $-key in map.values($oc-color-list) {
  .#{$-key} {
    color: var(--tier-#{$-key});
  }
}

.caption {
  flex-shrink: 0;
  min-width: calc(v-bind(minCaptionWidth) * 1px);
}

.characters {
  box-sizing: content-box;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 6px;
  min-height: calc(v-bind(imageWidth) * (1 / (var(--card-aspect-ratio))));
  padding: 6px;
}

.options {
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  width: 56px;
  &:hover {
    color: var(--text);
  }
}
</style>
