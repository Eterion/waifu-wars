<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTierStore } from '@/stores/useTier';
import type { Character } from '@/types/Character';
import type { Tier } from '@/types/Tier';
import { confirm } from '@/utils/confirm';
import { useElementHover, useMouseInElement } from '@vueuse/core';
import { computed, nextTick, ref } from 'vue';
import XIcon from './@icons/XIcon.vue';
import BaseCharacter from './BaseCharacter.vue';
import BaseTierCaption from './BaseTierCaption.vue';
import BaseTierColor from './BaseTierColor.vue';
import CharacterCardPlaceholder from './CharacterCardPlaceholder.vue';

const props = defineProps<{
  /**
   * Tier information.
   */
  info: Tier;
}>();

const IMAGE_WIDTH = 75;
const tierStore = useTierStore();
const charactersStore = useCharactersStore();
const draggingCharacterStore = useDraggingCharacterStore();
const rootRef = ref<HTMLElement>();
const { isOutside } = useMouseInElement(rootRef);
const hoverRef = ref<HTMLElement>();
const hovered = useElementHover(hoverRef);
const isChangingColor = ref(false);

const isInDropZone = computed(() => {
  return draggingCharacterStore.draggingInfo && !isOutside.value;
});

draggingCharacterStore.onDrop(({ draggingInfo }) => {
  if (!isOutside.value) {
    if (draggingInfo.origin === 'search') {
      const { id, ...info } = draggingInfo.character;
      charactersStore.saveCharacter(id, info);
    }
    nextTick(() => {
      tierStore.moveOrAddCharacter({
        characterId: draggingInfo.character.id,
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
  if (await confirm(`Remove tier ${props.info.caption}?`))
    tierStore.removeTier(props.info.id);
}
</script>

<template>
  <div ref="rootRef" :class="[$style.el, { [$style.active]: isInDropZone }]">
    <div ref="hoverRef">
      <Transition
        :enter-from-class="$style.vHidden"
        :leave-to-class="$style.vHidden"
        :enter-active-class="$style.vActive"
        :leave-active-class="$style.vActive">
        <ul v-if="isChangingColor || hovered" :class="$style.buttons">
          <li>
            <BaseTierColor
              :info="info"
              :class="[$style.button, info.color]"
              @visible="isChangingColor = $event" />
          </li>
          <li>
            <button
              :class="$style.button"
              type="button"
              title="Remove Tier"
              @click="removeTier">
              <XIcon :size="12" />
            </button>
          </li>
        </ul>
      </Transition>
      <BaseTierCaption :image-width="IMAGE_WIDTH" :info="info" />
    </div>
    <div :class="$style.characterList">
      <BaseCharacter
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
  </div>
</template>

<style module lang="scss">
.el {
  column-gap: 12px;
  display: grid;
  grid-template-columns: auto 1fr;
  position: relative;
  z-index: 0;

  &::before {
    border-radius: inherit;
    border-radius: 12px;
    content: '';
    display: block;
    pointer-events: none;
    position: absolute -12px;
    z-index: -1;
  }

  &.active {
    &::before {
      background-color: var(--drop);
    }
  }
}

.buttons {
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  padding: false 12px;
  position: absolute;
  right: 100%;
  row-gap: 6px;
  top: 0;
  &.vHidden {
    opacity: 0;
    transform: translateX(6px);
  }
  &.vActive {
    transition-duration: 200ms;
    transition-property: opacity, transform;
  }
}

.button {
  align-items: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  size: 20px;
}

.characterList {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
