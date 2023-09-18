import type {
  GetAnimeQuery,
  GetCharactersQuery,
} from '@/composables/useGraphQL';
import type { CharacterInfo } from '@/types/CharacterInfo';
import { first } from 'lodash-es';

/**
 * Creates {@link CharacterInfo} from {@link GetAnimeQuery} result.
 * @param result - Anime result
 */

export function createCharacterInfoFromGetAnime(result?: GetAnimeQuery) {
  return (result?.Page?.media || []).reduce<CharacterInfo[]>((arr, anime) => {
    const characters = (anime?.characters?.nodes || []).reduce<CharacterInfo[]>(
      (charArr, character) => {
        if (!character) return charArr;
        if (arr.some(({ id }) => id === character.id)) return charArr;
        if (charArr.some(({ id }) => id === character.id)) return charArr;
        charArr.push({
          age: character.age || undefined,
          animeMalId: anime?.idMal ?? undefined,
          animeName: anime?.title?.userPreferred || undefined,
          animeUrl: anime?.siteUrl || undefined,
          favourites: character.favourites ?? undefined,
          fullName: character.name?.userPreferred || '???',
          gender: character.gender || undefined,
          id: character.id,
          // @ts-expect-error Anilist will provide fallback image if it's missing.
          imageUrl: character.image?.large,
          siteUrl: character.siteUrl || undefined,
        });
        return charArr;
      },
      [],
    );
    arr.push(...characters);
    return arr;
  }, []);
}

/**
 * Creates {@link CharacterInfo} from {@link GetCharactersQuery} result.
 * @param result - Characters result
 */

export function createCharacterInfoFromGetCharacters(
  result?: GetCharactersQuery,
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
        favourites: character.favourites ?? undefined,
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
