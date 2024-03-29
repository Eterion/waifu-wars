import type { CharacterInfo } from '@/types/CharacterInfo';
import { expect, test } from 'vitest';
import {
  createCharacterInfoFromGetAnime,
  createCharacterInfoFromGetCharacters,
} from './createCharacterInfo';

test('createCharacterInfoFromGetAnime', () => {
  expect(
    createCharacterInfoFromGetAnime({
      Page: {
        media: [
          {
            id: 145665,
            idMal: 51105,
            siteUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
            title: { userPreferred: 'NieR:Automata Ver1.1a' },
            coverImage: {
              large:
                'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145665-kiAZX3DsbBnl.jpg',
            },
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

test('createCharacterInfoFromGetCharacters', () => {
  expect(
    createCharacterInfoFromGetCharacters({
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
                  coverImage: {
                    large:
                      'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145665-kiAZX3DsbBnl.jpg',
                  },
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
