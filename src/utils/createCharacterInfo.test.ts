import type { CharacterInfo } from '@/types/CharacterInfo';
import { expect, test } from 'vitest';
import {
  createCharacterInfoFromAnimeSearchResult,
  createCharacterInfoFromCharacterSearchResult,
} from './createCharacterInfo';

test('createCharacterInfoFromAnimeSearchResult', () => {
  expect(
    createCharacterInfoFromAnimeSearchResult({
      Page: {
        media: [
          {
            id: 145665,
            idMal: 51105,
            siteUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
            title: { userPreferred: 'NieR:Automata Ver1.1a' },
            characters: {
              nodes: [
                {
                  id: 132494,
                  image: {
                    large:
                      'https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg',
                  },
                  name: { userPreferred: 'YoRHa 2-gou B-gata' },
                  siteUrl:
                    'https://anilist.co/character/132494/YoRHa-2gou-Bgata',
                },
              ],
            },
          },
        ],
      },
    }),
  ).toStrictEqual([
    {
      age: undefined,
      animeMalId: 51105,
      animeName: 'NieR:Automata Ver1.1a',
      animeUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
      fullName: 'YoRHa 2-gou B-gata',
      gender: undefined,
      id: 132494,
      imageUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg',
      siteUrl: 'https://anilist.co/character/132494/YoRHa-2gou-Bgata',
    },
  ] satisfies CharacterInfo[]);
});

test('createCharacterInfoFromCharacterSearchResult', () => {
  expect(
    createCharacterInfoFromCharacterSearchResult({
      Page: {
        characters: [
          {
            id: 132494,
            image: {
              large:
                'https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg',
            },
            name: { userPreferred: 'YoRHa 2-gou B-gata' },
            siteUrl: 'https://anilist.co/character/132494/YoRHa-2gou-Bgata',
            media: {
              nodes: [
                {
                  id: 145665,
                  idMal: 51105,
                  siteUrl:
                    'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
                  title: { userPreferred: 'NieR:Automata Ver1.1a' },
                },
              ],
            },
          },
        ],
      },
    }),
  ).toStrictEqual([
    {
      age: undefined,
      animeMalId: 51105,
      animeName: 'NieR:Automata Ver1.1a',
      animeUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
      fullName: 'YoRHa 2-gou B-gata',
      gender: undefined,
      id: 132494,
      imageUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg',
      siteUrl: 'https://anilist.co/character/132494/YoRHa-2gou-Bgata',
    },
  ] satisfies CharacterInfo[]);
});
