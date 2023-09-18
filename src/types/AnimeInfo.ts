import { z } from 'zod';

export interface AnimeInfo {
  id: number;
  imageUrl?: string;
  malId?: number;
  name: string;
  siteUrl?: string;
}

export function isAnimeInfo(object: unknown): object is AnimeInfo {
  return z
    .strictObject({
      id: z.number(),
      imageUrl: z.string().optional(),
      malId: z.number().optional(),
      name: z.string(),
      siteUrl: z.string(),
    })
    .safeParse(object).success;
}
