<script setup lang="ts">
import BaseButton from '@/components/base-button/BaseButton.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { TIER_COLOR_KEYS, useTiersStore } from '@/stores/useTiers';
import { confirm } from '@/utils/confirm';
import { random } from 'lodash-es';
import { computed, ref } from 'vue';
import AddTierButton from './AddTierButton.vue';
import TierRow from './TierRow.vue';

const tiersStore = useTiersStore();

async function resetTiers() {
  if (
    await confirm(
      "Tiers will be restored tiers to default and removes any placed character. Characters won't be removed from the saved list. Reset tiers?"
    )
  )
    tiersStore.reset();
}

async function clearCharacters() {
  if (
    await confirm(
      "All tiers will be cleared of all characters. Characters won't be removed from the saved list. Clear characters?"
    )
  )
    tiersStore.clearCharacters();
}

function addTier(options?: Parameters<typeof tiersStore.addTier>[1]) {
  tiersStore.addTier(
    { color: TIER_COLOR_KEYS[random(TIER_COLOR_KEYS.length - 1)] },
    options
  );
}

const captionWidths = ref<Array<{ tierId: number; width: number }>>([]);
const minCaptionWidth = computed(() => {
  return Math.max(
    0,
    ...captionWidths.value.map(({ width }) => {
      return width;
    })
  );
});

const tiers = computed(() => {
  return tiersStore.tiers.map((tierInfo, index) => {
    return {
      tierInfo,
      onAddTier: () => {
        addTier({ atIndex: index });
      },
      onCaptionWidthChange: (width: number) => {
        const found = captionWidths.value.find(({ tierId }) => {
          return tierId === tierInfo.id;
        });
        if (found) {
          found.width = width;
        } else {
          captionWidths.value.push({
            tierId: tierInfo.id,
            width,
          });
        }
      },
    };
  });
});
</script>

<template>
  <div>
    <ButtonGroup>
      <BaseButton @click="resetTiers">Reset tiers</BaseButton>
      <BaseButton @click="clearCharacters">Clear characters</BaseButton>
    </ButtonGroup>
    <div :class="$style.tiers">
      <template
        v-for="{ onAddTier, onCaptionWidthChange, tierInfo } in tiers"
        :key="tierInfo.id">
        <div :class="$style.add">
          <AddTierButton @click="onAddTier" />
        </div>
        <TierRow
          :info="tierInfo"
          :min-caption-width="minCaptionWidth"
          @caption-width-change="onCaptionWidthChange" />
      </template>
      <div :class="$style.add">
        <AddTierButton @click="addTier()" />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.tiers {
  display: grid;
  grid-auto-rows: 6px auto;
  position: relative;
  z-index: 0;

  .add {
    align-items: center;
    display: flex;
    height: 100%;
    padding-left: 18px;
    position: relative;
    z-index: 1;
  }
}
</style>
