import { z } from 'zod';

export interface AnimeInfo {
  favourites?: number;
  id: number;
  imageUrl: string;
  malId?: number;
  name: string;
  siteUrl?: string;
}

export function isAnimeInfo(object: unknown): object is AnimeInfo {
  return z
    .strictObject({
      favourites: z.number().optional(),
      id: z.number(),
      imageUrl: z.string(),
      malId: z.number().optional(),
      name: z.string(),
      siteUrl: z.string(),
    })
    .safeParse(object).success;
}
