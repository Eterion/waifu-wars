<script setup lang="ts">
import { TIER_COLOR_KEYS, useTierStore } from '@/stores/useTier';
import { confirm } from '@/utils/confirm';
import { random } from 'lodash-es';
import { computed } from 'vue';
import BaseButton from '../BaseButton.vue';
import BaseTier from '../BaseTier.vue';
import ButtonGroup from '../ButtonGroup.vue';
import PlusIcon from '../icons/PlusIcon.vue';

const tierStore = useTierStore();

async function resetTiers() {
  if (
    await confirm(
      "Tiers will be restored tiers to default and removes any placed character. Characters won't be removed from the saved list. Reset tiers?"
    )
  )
    tierStore.reset();
}

async function clearCharacters() {
  if (
    await confirm(
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
      <div :class="$style.add">
        <button
          type="button"
          :class="$style.add_button"
          title="Add Tier"
          @click="tierInfo.onAddTier">
          <PlusIcon :size="14" />
        </button>
      </div>
      <BaseTier :info="tierInfo" />
    </template>
    <div :class="$style.add">
      <button
        type="button"
        :class="$style.add_button"
        title="Add Tier"
        @click="addTier()">
        <PlusIcon :size="14" />
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.buttons {
  margin-bottom: 24px;
}

.add {
  padding: 6px false;
  &_button {
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 12px;
    color: var(--text-light);
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: false 6px;
    padding: 6px 0;
    transition-duration: 200ms;
    transition-property: background-color, color, transform;
    width: 75px - 6px * 2;

    & > svg {
      stroke-width: 1;
    }

    &:active {
      transform: scale(0.9);
    }

    &:hover {
      background-color: var(--gray);
      color: var(--text);
    }
  }
}
</style>
