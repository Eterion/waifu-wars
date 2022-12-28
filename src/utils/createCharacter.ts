import type {
  AnimeSearchQuery,
  CharacterSearchQuery,
} from '@/composables/useGraphQL';
import type { Character } from '@/types/Character';

/**
 * Creates {@link Character} from {@link AnimeSearchQuery} result.
 * @param result - Anime search result
 * @param iterator - Iterator function
 */

export function createCharacterFromAnimeSearchResult(
  result?: AnimeSearchQuery,
  iterator?: (character: Character) => void
) {
  return (result?.Page?.media || []).reduce<Character[]>((arr, anime) => {
    for (const character of anime?.characters?.nodes || []) {
      if (character) {
        const isAdded = arr.some(({ id }) => id === character.id);
        if (!isAdded) {
          const data: Character = {
            id: character.id,
            age: character.age,
            animeMalId: anime?.idMal,
            animeName: anime?.title?.userPreferred,
            animeUrl: anime?.siteUrl,
            fullName: character.name?.userPreferred,
            gender: character.gender,
            imageUrl: character.image?.large,
            siteUrl: character.siteUrl,
          };
          arr.push(data);
          iterator?.call(null, data);
        }
      }
    }
    return arr;
  }, []);
}

/**
 * Creates {@link Character} from {@link CharacterSearchQuery} result.
 * @param result - Character Search result
 * @param iterator - Iterator function
 */

export function createCharacterFromCharacterSearchResult(
  result?: CharacterSearchQuery,
  iterator?: (character: Character) => void
) {
  return (result?.Page?.characters || []).reduce<Character[]>(
    (arr, character) => {
      if (character) {
        const anime = character.media?.nodes?.at(0);
        const data: Character = {
          id: character.id,
          age: character.age,
          animeMalId: anime?.idMal,
          animeName: anime?.title?.userPreferred,
          animeUrl: anime?.siteUrl,
          fullName: character.name?.userPreferred,
          gender: character.gender,
          imageUrl: character.image?.large,
          siteUrl: character.siteUrl,
        };
        arr.push(data);
        iterator?.call(null, data);
      }
      return arr;
    },
    []
  );
}
