import type OpenColor from 'open-color';

export interface Tier {
  caption?: string;
  characterIds?: number[];
  color: Exclude<keyof OpenColor, 'black' | 'white'>;
  id: number;
}
