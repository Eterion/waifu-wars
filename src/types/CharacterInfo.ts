import { z } from 'zod';

export interface CharacterInfo {
  age?: string;
  animeMalId?: number;
  animeName?: string;
  animeUrl?: string;
  fullName: string;
  gender?: string;
  id: number;
  imageUrl: string;
  siteUrl?: string;
}

export function isCharacterInfo(object: unknown): object is CharacterInfo {
  return z
    .strictObject({
      age: z.string().optional(),
      animeMalId: z.number().optional(),
      animeName: z.string().optional(),
      animeUrl: z.string().optional(),
      fullName: z.string(),
      gender: z.string().optional(),
      id: z.number(),
      imageUrl: z.string(),
      siteUrl: z.string().optional(),
    })
    .safeParse(object).success;
}
