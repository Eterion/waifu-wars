import type {
  AnimeSearchQuery,
  CharacterSearchQuery,
} from '@/composables/useGraphQL';
import type { CharacterInfo } from '@/types/CharacterInfo';
import { first } from 'lodash-es';

/**
 * Creates {@link CharacterInfo} from {@link AnimeSearchQuery} result.
 * @param result - Anime search result
 */

export function createCharacterInfoFromAnimeSearchResult(
  result?: AnimeSearchQuery,
) {
  return (result?.Page?.media || []).reduce<CharacterInfo[]>((arr, anime) => {
    const characters = (anime?.characters?.nodes || []).reduce<CharacterInfo[]>(
      (arr, character) => {
        if (!character) return arr;
        if (arr.some(({ id }) => id === character.id)) return arr;
        arr.push({
          age: character.age || undefined,
          animeMalId: anime?.idMal ?? undefined,
          animeName: anime?.title?.userPreferred || undefined,
          animeUrl: anime?.siteUrl || undefined,
          fullName: character.name?.userPreferred || '???',
          gender: character.gender || undefined,
          id: character.id,
          // @ts-expect-error Anilist will provide fallback image if it's missing.
          imageUrl: character.image?.large,
          siteUrl: character.siteUrl || undefined,
        });
        return arr;
      },
      [],
    );
    arr.push(...characters);
    return arr;
  }, []);
}

/**
 * Creates {@link CharacterInfo} from {@link CharacterSearchQuery} result.
 * @param result - Character search result
 */

export function createCharacterInfoFromCharacterSearchResult(
  result?: CharacterSearchQuery,
) {
  return (result?.Page?.characters || []).reduce<CharacterInfo[]>(
    (arr, character) => {
      if (!character) return arr;
      const anime = first(character?.media?.nodes || []);
      arr.push({
        age: character.age || undefined,
        animeMalId: anime?.idMal ?? undefined,
        animeName: anime?.title?.userPreferred || undefined,
        animeUrl: anime?.siteUrl || undefined,
        fullName: character.name?.userPreferred || '???',
        gender: character.gender || undefined,
        id: character.id,
        // @ts-expect-error Anilist will provide fallback image if it's missing.
        imageUrl: character.image?.large,
        siteUrl: character.siteUrl || undefined,
      });
      return arr;
    },
    [],
  );
}
