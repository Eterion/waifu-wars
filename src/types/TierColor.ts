import type OpenColor from 'open-color';

/**
 * Tier color.
 */

export type TierColor = Exclude<keyof OpenColor, 'black' | 'white'>;
