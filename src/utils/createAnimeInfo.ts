import type { GetAnimeQuery } from '@/composables/useGraphQL';
import type { AnimeInfo } from '@/types/AnimeInfo';

/**
 * Creates {@link AnimeInfo} from {@link GetCharactersQuery} result.
 * @param result - Anime result
 */

export function createAnimeInfoFromGetAnime(result?: GetAnimeQuery) {
  return (result?.Page?.media || []).reduce<AnimeInfo[]>((arr, anime) => {
    if (!anime) return arr;
    arr.push({
      id: anime.id,
      // @ts-expect-error Anilist will provide fallback image if it's missing.
      imageUrl: anime.coverImage?.large,
      malId: anime.idMal ?? undefined,
      name: anime.title?.userPreferred || '???',
      siteUrl: anime.siteUrl || undefined,
    });
    return arr;
  }, []);
}
