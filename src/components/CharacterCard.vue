<script setup lang="ts">
import { useDraggingCharacterStore } from '@/stores/useDraggingCharacter';
import { useTiersStore } from '@/stores/useTiers';
import type { Character } from '@/types/Character';
import type { DragEventOrigin } from '@/types/DragEventOrigin';
import { useElementBounding, useMouse } from '@vueuse/core';
import { computed, reactive, ref, watch, type PropType } from 'vue';
import BaseTooltip from './base-tooltip/BaseTooltip.vue';
import ContextMenu from './ContextMenu.vue';

const props = defineProps({
  /**
   * Changes display format to a card.
   */
  card: Boolean,
  /**
   * Origin of the drag event.
   */
  dragEventOrigin: {
    default: false,
    type: [Boolean, String] as PropType<false | DragEventOrigin>,
  },
  /**
   * Image width, in pixels.
   */
  imageWidth: {
    required: true,
    type: Number,
  },
  /**
   * Character info.
   */
  info: {
    required: true,
    type: Object as PropType<Character>,
  },
  /**
   * Indicates the character is saved.
   */
  isSaved: Boolean,
});

const emit = defineEmits<{
  (e: 'mouseInSecondQuadrant', id: number, isInQuadrant: boolean): void;
}>();

const elRef = ref<HTMLElement>();
const hasTooltip = computed(() => props.card && props.dragEventOrigin);
const bounding = reactive(useElementBounding(elRef));
const mouse = reactive(useMouse());

const isMouseInSecondQuadrant = computed(() => {
  return mouse.x < bounding.right && mouse.y < bounding.bottom;
});

watch(isMouseInSecondQuadrant, (isMouseInSecondQuadrant) => {
  emit('mouseInSecondQuadrant', props.info.id, isMouseInSecondQuadrant);
});

const imageWidth = computed(() => {
  return `${props.imageWidth}px`;
});

const tiersStore = useTiersStore();
const draggingCharacterStore = useDraggingCharacterStore();
function onMouseDown() {
  if (props.dragEventOrigin) {
    if (props.dragEventOrigin === 'search' || props.dragEventOrigin === 'tier')
      tiersStore.removeCharacter(props.info.id);
    draggingCharacterStore.drag({
      character: props.info,
      origin: props.dragEventOrigin,
    });
  }
}
</script>

<template>
  <div @mousedown.left.stop.prevent="onMouseDown">
    <div
      ref="elRef"
      :class="[
        $style.el,
        card ? $style.card : $style.default,
        { [$style.saved]: isSaved },
      ]">
      <div :class="[$style.img, card ? $style.card : $style.default]">
        <img
          v-if="info.imageUrl"
          :src="info.imageUrl"
          :alt="info.fullName || 'N/A'"
          loading="lazy" />
      </div>
      <div v-if="!card" :class="$style.text">
        <div :class="$style.fullName">{{ info.fullName }}</div>
        <div :class="$style.animeName">{{ info.animeName }}</div>
      </div>
    </div>
    <BaseTooltip
      v-if="hasTooltip"
      :outside-reference-element="elRef"
      placement="top">
      <template #value>
        {{ info.fullName }}
      </template>
    </BaseTooltip>
    <ContextMenu :outside-reference-element="elRef" :class="$style.contextMenu">
      <img
        v-if="info.imageUrl"
        :src="info.imageUrl"
        :alt="info.fullName || 'N/A'"
        loading="lazy"
        :class="$style.contextMenu_img" />
      <dl :class="$style.contextMenu_data">
        <dt>Name</dt>
        <dd>
          {{ info.fullName }}
        </dd>
        <dd v-if="info.siteUrl">
          <a :href="info.siteUrl" target="_blank" rel="noopener,noreferer">
            Anilist.co
          </a>
        </dd>
        <dt>Anime</dt>
        <dd>
          {{ info.animeName }}
        </dd>
        <dd v-if="info.animeUrl">
          <a :href="info.animeUrl" target="_blank" rel="noopener,noreferer">
            Anilist.co
          </a>
        </dd>
        <dd v-if="info.animeMalId">
          <a
            :href="`https://myanimelist.net/anime/${info.animeMalId}`"
            target="_blank"
            rel="noopener,noreferer">
            My Anime List
          </a>
        </dd>
      </dl>
    </ContextMenu>
  </div>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  &.default {
    align-items: center;
    column-gap: 12px;
    display: flex;
    line-height: 1.4;
    min-width: 0;
  }

  &.saved {
    filter: grayscale(1);
    opacity: 0.25;
  }
}

.img {
  aspect-ratio: var(--card-aspect-ratio);
  overflow: hidden;
  position: relative;
  width: v-bind(imageWidth);

  &.default {
    border-radius: 6px;
    flex-shrink: 0;
  }

  &.card {
    border-radius: 12px;
  }

  & > img {
    display: block;
    object-fit: cover;
    width: 100%;
  }
}

.text {
  min-width: 0;
}

.fullName {
  font-weight: semibold;
}

.animeName {
  color: var(--text-light);
  font-size: 0.8125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contextMenu {
  align-items: flex-start;
  background-color: var(--foreground);
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(#000, 0.05);
  column-gap: 12px;
  display: flex;
  padding: 12px;
  &_img {
    border-radius: 6px;
    width: 100px;
  }
  &_data {
    & > dt {
      color: var(--text-light);
    }
  }
}
</style>
