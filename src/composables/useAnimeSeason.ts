import { reactiveComputed, useNow } from '@vueuse/core';
import { computed } from 'vue';
import { MediaSeason } from './useGraphQL';

const SEASONS_IN_ORDER = [
  MediaSeason.Winter,
  MediaSeason.Spring,
  MediaSeason.Summer,
  MediaSeason.Fall,
];

/**
 * Composable for current anime season.
 * @example
 * ```ts
 * const { currentSeason, lastSeason } = useAnimeSeason();
 * ```
 */

export function useAnimeSeason() {
  const now = useNow();
  const month = computed(() => now.value.getMonth());
  const currentYear = computed(() => now.value.getFullYear());

  const currentSeason = reactiveComputed(() => ({
    year: currentYear.value,
    get kind() {
      if (month.value < 3) return MediaSeason.Winter;
      else if (month.value < 6) return MediaSeason.Spring;
      else if (month.value < 9) return MediaSeason.Summer;
      return MediaSeason.Winter;
    },
  }));

  const lastSeason = reactiveComputed(() => {
    const lastSeasonIndex =
      SEASONS_IN_ORDER.findIndex((value) => {
        return value === currentSeason.kind;
      }) - 1;
    return {
      year: currentYear.value - (lastSeasonIndex < 0 ? -1 : 0),
      kind: SEASONS_IN_ORDER.at(lastSeasonIndex),
    };
  });

  return {
    currentSeason,
    lastSeason,
  };
}
