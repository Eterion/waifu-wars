import type { Tier } from '@/types/Tier';
import { useStorage } from '@vueuse/core';
import { remove } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed } from 'vue';

/**
 * Default array of tiers.
 * @internal
 */

const DEFAULT_TIERS: Tier[] = [
  {
    caption: 'S',
    color: 'red',
    id: 0,
  },
  {
    caption: 'A',
    color: 'orange',
    id: 1,
  },
  {
    caption: 'B',
    color: 'yellow',
    id: 2,
  },
  {
    caption: 'C',
    color: 'blue',
    id: 3,
  },
  {
    caption: 'D',
    color: 'cyan',
    id: 4,
  },
  {
    caption: 'Trash',
    color: 'gray',
    id: 5,
  },
];

export const useTierStore = defineStore('tier', () => {
  /**
   * Array of tiers.
   */

  const tiers = useStorage<Tier[]>('waifu-wars-tiers', DEFAULT_TIERS);

  /**
   * Array of tier ids computed from {@link tiers} value.
   */

  const tierIds = computed(() => {
    return tiers.value.map(({ id }) => {
      return id;
    });
  });

  /**
   * Adds new tier.
   * @param info - Info
   */

  function addTier({ caption, color }: Pick<Tier, 'caption' | 'color'>) {
    tiers.value.push({
      id: Math.max(...tierIds.value) + 1,
      caption,
      color,
    });
  }

  /**
   * Removes existing tier.
   * @param id - Tier id
   */

  function removeTier(id: number) {
    remove(tiers.value, ({ id: _id }) => {
      return _id === id;
    });
  }

  /**
   * Resets tiers to {@link DEFAULT_TIERS}.
   */

  function reset() {
    tiers.value = DEFAULT_TIERS;
  }

  return {
    addTier,
    removeTier,
    reset,
    tierIds,
    tiers,
  };
});
