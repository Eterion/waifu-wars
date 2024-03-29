import type { TierColor } from './TierColor';

export interface Tier {
  /** Caption text. */
  caption?: string;
  /** List of placed character ids, in order. */
  characterIds?: number[];
  /** Color key. */
  color: TierColor;
  /** Unique identifier. */
  id: number;
}
