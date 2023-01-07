import type { Tier } from '@/types/Tier';
import { useStorage } from '@vueuse/core';
import { clamp, isNumber, remove } from 'lodash-es';
import OpenColor from 'open-color';
import { defineStore } from 'pinia';
import { computed } from 'vue';

/**
 * Filtered open color keys.
 * @internal
 */

type Keys = Exclude<keyof OpenColor, 'black' | 'white'>;

/**
 * Tier color.
 */

export type TierColor = Keys | `${Keys}-2`;

/**
 * Array of possible tier colors.
 */

export const TIER_COLOR_KEYS = Object.keys(OpenColor)
  .filter((key) => !['black', 'white'].includes(key))
  .reduce<TierColor[]>((arr, key) => {
    arr.push(key as TierColor, `${key}-2` as TierColor);
    return arr;
  }, []);

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
   * Finds tier value by `id`.
   * @param tierId - Tier id
   * @returns Tier value
   */

  function findById(tierId: number) {
    return tiers.value.find(({ id }) => {
      return id === tierId;
    });
  }

  /**
   * Adds new tier.
   * @param info - Info
   * @param options - Options
   * @returns Tier info
   */

  function addTier(
    { caption, color }: Pick<Tier, 'caption' | 'color'>,
    {
      atIndex,
    }: {
      /** Create at specific index. */
      atIndex?: number;
    } = {}
  ) {
    const tier: Tier = {
      id: Math.max(...tierIds.value) + 1,
      caption,
      color,
    };
    if (isNumber(atIndex)) {
      const maxIndex = Math.max(0, tiers.value.length - 1);
      const index = clamp(atIndex, 0, maxIndex);
      tiers.value.splice(index, 0, tier);
    } else {
      tiers.value.push(tier);
    }
    return tier;
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

  function moveOrAddCharacter({
    atIndex,
    characterId,
    tierId,
  }: {
    /** At specific index. */
    atIndex?: number;
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
      if (isNumber(atIndex)) {
        const maxIndex = Math.max(0, tier.characterIds.length - 1);
        const index = clamp(atIndex, 0, maxIndex);
        tier.characterIds.splice(index, 0, characterId);
      } else {
        tier.characterIds.push(characterId);
      }
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
    findById,
    moveOrAddCharacter,
    removeCharacter,
    removeTier,
    reset,
    tierIds,
    tiers,
  };
});
