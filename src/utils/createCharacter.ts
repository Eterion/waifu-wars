import type { CharacterSearchQuery } from '@/composables/useGraphQL';
import type { Character } from '@/types/Character';

/**
 * Creates {@link Character} from {@link CharacterSearchQuery} result.
 * @param result - Search query result
 * @param iterator - Iterator function
 */

export function createCharacterFromCharacterSearchResult(
  result?: CharacterSearchQuery,
  iterator?: (character: Character) => void
) {
  return result?.Page?.characters?.reduce<Character[]>((arr, character) => {
    if (character) {
      const anime = character.media?.nodes?.at(0);
      const data: Character = {
        id: character.id,
        age: character.age,
        animeMalId: anime?.idMal,
        animeName: anime?.title?.userPreferred,
        animeUrl: anime?.title?.userPreferred,
        fullName: character.name?.userPreferred,
        gender: character.gender,
        imageUrl: character.image?.large,
        siteUrl: character.siteUrl,
      };
      arr.push(data);
      iterator?.call(null, data);
    }
    return arr;
  }, []);
}
