<script setup lang="ts">
import { useTierStore } from '@/stores/useTier';
import { storeToRefs } from 'pinia';
import BaseTier from './BaseTier.vue';

const tierStore = useTierStore();
const { reset, clearCharacters } = tierStore;
const { tiers } = storeToRefs(tierStore);
</script>

<template>
  <div>
    <button type="button" @click="reset">Reset tiers</button>
    <button type="button" @click="clearCharacters">Clear characters</button>
    <ul :class="$style.tiers">
      <li v-for="tierInfo in tiers" :key="tierInfo.id">
        <BaseTier :info="tierInfo" />
      </li>
    </ul>
  </div>
</template>

<style module lang="scss">
.tiers {
  list-style: none;
  padding: 0;
}
</style>
