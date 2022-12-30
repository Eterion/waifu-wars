<script setup lang="ts">
import { useTierStore } from '@/stores/useTier';
import type { Tier } from '@/types/Tier';
import { random } from 'lodash-es';
import OpenColor from 'open-color';
import { computed } from 'vue';
import AddTier from '../AddTier.vue';
import BaseButton from '../BaseButton.vue';
import BaseTier from '../BaseTier.vue';
import ButtonGroup from '../ButtonGroup.vue';

const tierStore = useTierStore();
const { reset, clearCharacters } = tierStore;
const colorOptions = Object.keys(OpenColor).filter((key) => {
  return !['black', 'white'].includes(key);
}) as Array<Tier['color']>;

function addTier(options?: Parameters<typeof tierStore.addTier>[1]) {
  tierStore.addTier(
    { color: colorOptions[random(colorOptions.length - 1)] },
    options
  );
}

const tiers = computed(() => {
  return tierStore.tiers.map((tierInfo, index) => {
    return {
      ...tierInfo,
      onAddTier: () => {
        addTier({ atIndex: index });
      },
    };
  });
});
</script>

<template>
  <div>
    <ButtonGroup>
      <BaseButton @click="reset">Reset tiers</BaseButton>
      <BaseButton @click="clearCharacters">Clear characters</BaseButton>
    </ButtonGroup>
    <template v-for="tierInfo in tiers" :key="tierInfo.id">
      <AddTier @add="tierInfo.onAddTier" />
      <BaseTier :info="tierInfo" />
    </template>
    <AddTier @add="addTier" />
  </div>
</template>
