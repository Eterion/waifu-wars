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
   * Clears characters from all {@link tiers}.
   */

  function clearCharacters() {
    tiers.value.forEach((tier) => {
      tier.characterIds = [];
    });
  }

  /**
   * Moves or adds character to tier.
   * @param info - Move info
   */

  function moveCharacter({
    characterId,
    tierId,
  }: {
    /** Character id. */
    characterId: number;
    /** Tier id. */
    tierId: number;
  }) {
    removeCharacter(characterId);
    const tier = tiers.value.find(({ id }) => {
      return id === tierId;
    });
    if (tier) {
      if (!tier.characterIds) tier.characterIds = [];
      tier.characterIds.push(characterId);
    }
  }

  /**
   * Removes character from tier.
   * @param characterId - Character id
   */

  function removeCharacter(characterId: number) {
    tiers.value.forEach((tier) => {
      if (tier.characterIds?.includes(characterId))
        remove(tier.characterIds, (id) => {
          return id === characterId;
        });
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
    clearCharacters,
    moveCharacter,
    removeCharacter,
    removeTier,
    reset,
    tierIds,
    tiers,
  };
});
