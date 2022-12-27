<script setup lang="ts">
import { useFavoritesStore } from '@/stores/useFavorites';
import { storeToRefs } from 'pinia';
import BaseCharacter from './BaseCharacter.vue';

const favoritesStore = useFavoritesStore();
const { reset } = favoritesStore;
const { characters } = storeToRefs(favoritesStore);
</script>

<template>
  <div>
    <button type="button" @click="reset">Reset favorites</button>
    <ul :class="$style.favorites">
      <li v-for="character in characters" :key="character.id">
        <BaseCharacter card :info="character" />
      </li>
    </ul>
  </div>
</template>

<style module lang="scss">
.favorites {
  column-gap: 12px;
  display: flex;
  list-style: none;
  padding: 0;
}
</style>
