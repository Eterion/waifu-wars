<script setup lang="ts">
import { useCharacterDragStore } from '@/stores/useCharacterDrag';
import { useCharactersStore } from '@/stores/useCharacters';
import type { Character } from '@/types/Character';
import { omitBy } from 'lodash-es';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const props = defineProps<{
  /**
   * Changes display format to a card.
   */
  card?: boolean;
  /**
   * Image width, in pixels.
   */
  imageWidth?: number;
  /**
   * Character info.
   */
  info: Character;
}>();

const imageWidth = computed(() => {
  const defaultWidth = props.card ? 100 : 46;
  return `${props.imageWidth ?? defaultWidth}px`;
});

const charactersStore = useCharactersStore();
const { savedCharacterIds } = storeToRefs(charactersStore);
const isCharacterSaved = computed(() => {
  return savedCharacterIds.value.includes(props.info.id);
});

function toggleSaved() {
  if (isCharacterSaved.value) {
    charactersStore.removeCharacter(props.info.id);
  } else {
    charactersStore.saveCharacter(
      props.info.id,
      omitBy(props.info, (_, key) => {
        return key === 'id';
      })
    );
  }
}

const characterDragStore = useCharacterDragStore();
function onMouseDown() {
  characterDragStore.drag(props.info);
}
</script>

<template>
  <div :class="$style.el">
    <div
      :class="card ? $style.card : $style.default"
      @mousedown.stop.prevent="onMouseDown">
      <img
        v-if="info.imageUrl"
        :class="$style.img"
        :src="info.imageUrl"
        :alt="info.fullName || 'Unknown'"
        loading="lazy" />
      <div v-if="!card">
        <div>{{ info.fullName }}</div>
        <div>{{ info.animeName }}</div>
      </div>
    </div>
    <div>
      <button v-if="!card" type="button" @click="toggleSaved">
        {{ isCharacterSaved ? 'Remove' : 'Add' }}
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.el {
  display: inline-flex;
}

.default {
  align-items: center;
  display: flex;

  .img {
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    object-fit: cover;
    size: v-bind(imageWidth);
  }
}

.card {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  width: v-bind(imageWidth);

  .img {
    object-fit: cover;
    width: 100%;
  }
}
</style>
