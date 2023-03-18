<script setup lang="ts">
import FillColorIcon from '@/components/@icons/FillColorIcon.vue';
import TrashIcon from '@/components/@icons/TrashIcon.vue';
import XIcon from '@/components/@icons/XIcon.vue';
import CharacterCard from '@/components/CharacterCard.vue';
import CharacterCardPlaceholder from '@/components/CharacterCardPlaceholder.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import ContextMenuLinks from '@/components/ContextMenuLinks.vue';
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import type { Character } from '@/types/Character';
import type { Tier } from '@/types/Tier';
import { confirm } from '@/utils/confirm';
import { useMouseInElement } from '@vueuse/core';
import { computed, nextTick, ref } from 'vue';
import TierCaption from './TierCaption.vue';

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
const tierStore = useTierStore();
const charactersStore = useCharactersStore();
const draggingCharacterStore = useDraggingCharacterStore();
const rootRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(rootRef);

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
      tierStore.moveOrAddCharacter({
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

async function removeTier() {
  if (await confirm(`Remove tier ${props.info.caption}`))
    tierStore.removeTier(props.info.id);
}
</script>

<template>
  <div>
    <div
      ref="rootRef"
      :class="[$style.el, { [$style.isActive]: isInDropZone }]">
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
      <ContextMenu
        :outside-reference-element="rootRef"
        :class="$style.contextMenu">
        <template #contextMenu="{ hide }">
          <ContextMenuLinks
            :data-source="[
              {
                caption: 'Change Color',
                iconTemplate: 'color',
                onClick: () => {
                  hide();
                },
              },
              {
                caption: 'Clear Tier',
                iconTemplate: 'clear',
                onClick: () => {
                  hide();
                },
              },
              {
                caption: 'Remove Tier',
                danger: true,
                iconTemplate: 'trash',
                onClick: () => {
                  hide();
                  removeTier();
                },
              },
            ]">
            <template #color="icon"><FillColorIcon v-bind="icon" /></template>
            <template #clear="icon"><XIcon v-bind="icon" /></template>
            <template #trash="icon"><TrashIcon v-bind="icon" /></template>
          </ContextMenuLinks>
        </template>
      </ContextMenu>
    </div>
  </div>
</template>

<style module lang="scss">
.el {
  align-items: stretch;
  background-color: var(--foreground);
  border-radius: 12px;
  color: v-bind('info.color');
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

.contextMenu {
  background-color: var(--foreground);
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(#000, 0.05);
  padding: 12px;
}
</style>
