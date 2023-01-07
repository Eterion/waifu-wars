<script setup lang="ts">
import { TIER_COLOR_KEYS, useTierStore } from '@/stores/useTier';
import { random } from 'lodash-es';
import { computed } from 'vue';
import AddTier from '../AddTier.vue';
import BaseButton from '../BaseButton.vue';
import BaseTier from '../BaseTier.vue';
import ButtonGroup from '../ButtonGroup.vue';

const tierStore = useTierStore();

function resetTiers() {
  if (
    confirm(
      "Tiers will be restored tiers to default and removes any placed character. Characters won't be removed from the saved list. Reset tiers?"
    )
  )
    tierStore.reset();
}

function clearCharacters() {
  if (
    confirm(
      "All tiers will be cleared of all characters. Characters won't be removed from the saved list. Clear characters?"
    )
  )
    tierStore.clearCharacters();
}

function addTier(options?: Parameters<typeof tierStore.addTier>[1]) {
  tierStore.addTier(
    { color: TIER_COLOR_KEYS[random(TIER_COLOR_KEYS.length - 1)] },
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
    <ButtonGroup :class="$style.buttons">
      <BaseButton @click="resetTiers">Reset tiers</BaseButton>
      <BaseButton @click="clearCharacters">Clear characters</BaseButton>
    </ButtonGroup>
    <template v-for="tierInfo in tiers" :key="tierInfo.id">
      <AddTier @add="tierInfo.onAddTier" />
      <BaseTier :info="tierInfo" />
    </template>
    <AddTier @add="addTier" />
  </div>
</template>

<style module lang="scss">
.buttons {
  margin-bottom: 24px;
}
</style>
