<script setup lang="ts">
import { useTierStore } from '@/stores/useTier';
import { storeToRefs } from 'pinia';
import BaseTier from './BaseTier.vue';

const tierStore = useTierStore();
const { reset } = tierStore;
const { tierIds } = storeToRefs(tierStore);
</script>

<template>
  <div>
    <button type="button" @click="reset">Reset tiers</button>
    <ul :class="$style.tiers">
      <li v-for="tierId in tierIds" :key="tierId">
        <BaseTier :id="tierId" />
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
