<script setup lang="ts">
import { useCharacterDragStore } from '@/stores/useCharacterDrag';
import { useFavoritesStore } from '@/stores/useFavorites';
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

const favoritesStore = useFavoritesStore();
const { favoriteIds } = storeToRefs(favoritesStore);
const isFavorite = computed(() => {
  return favoriteIds.value.includes(props.info.id);
});

function toggleFavorite() {
  if (isFavorite.value) {
    favoritesStore.removeFavorite(props.info.id);
  } else {
    favoritesStore.addFavorite(
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
  <div
    :class="card ? $style.card : $style.el"
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
    <button v-if="!card" type="button" @click="toggleFavorite">
      {{ isFavorite ? 'Remove' : 'Add' }}
    </button>
  </div>
</template>

<style module lang="scss">
.el {
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
