import type { Nil } from './utility/Nil';

export interface Character {
  age?: Nil<string>;
  animeMalId?: Nil<number>;
  animeName?: Nil<string>;
  animeUrl?: Nil<string>;
  fullName?: Nil<string>;
  gender?: Nil<string>;
  id: number;
  imageUrl?: Nil<string>;
  siteUrl?: Nil<string>;
}
