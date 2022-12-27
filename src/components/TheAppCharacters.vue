<script setup lang="ts">
import { useCharactersStore } from '@/stores/useCharacters';
import { storeToRefs } from 'pinia';
import BaseCharacter from './BaseCharacter.vue';

const charactersStore = useCharactersStore();
const { reset } = charactersStore;
const { characters } = storeToRefs(charactersStore);
</script>

<template>
  <div>
    <button type="button" @click="reset">Reset characters</button>
    <ul :class="$style.cards">
      <li v-for="character in characters" :key="character.id">
        <BaseCharacter card :info="character" />
      </li>
    </ul>
  </div>
</template>

<style module lang="scss">
.cards {
  column-gap: 12px;
  display: flex;
  list-style: none;
  padding: 0;
}
</style>
