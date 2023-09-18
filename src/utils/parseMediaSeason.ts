import { MediaSeason } from '@/composables/useGraphQL';
import { z } from 'zod';

/**
 * Parse season-like string to {@link MediaSeason} enum.
 * @param season - Season-like string
 */

export function parseMediaSeason(season?: string) {
  if (!season) return undefined;
  try {
    return z.nativeEnum(MediaSeason).parse(season.toUpperCase());
  } catch (e) {
    return undefined;
  }
}
