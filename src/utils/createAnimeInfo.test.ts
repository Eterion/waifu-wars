import type { AnimeInfo } from '@/types/AnimeInfo';
import { expect, test } from 'vitest';
import { createAnimeInfoFromGetAnime } from './createAnimeInfo';

test('createAnimeInfoFromGetAnime', () => {
  expect(
    createAnimeInfoFromGetAnime({
      Page: {
        media: [
          {
            id: 145665,
            idMal: 51105,
            coverImage: {
              large:
                'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145665-kiAZX3DsbBnl.jpg',
            },
            siteUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
            title: { userPreferred: 'NieR:Automata Ver1.1a' },
          },
        ],
      },
    }),
  ).toStrictEqual([
    {
      id: 145665,
      imageUrl:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145665-kiAZX3DsbBnl.jpg',
      name: 'NieR:Automata Ver1.1a',
      malId: 51105,
      siteUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
    },
  ] satisfies AnimeInfo[]);
});
