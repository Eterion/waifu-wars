<script setup lang="ts">
import {
  MediaSeason,
  useGetAnimeQuery,
  useGetCharactersQuery,
} from '@/composables/useGraphQL';
import type { MaybeArray } from '@/types/utility/MaybeArray';
import { createAnimeInfoFromGetAnime } from '@/utils/createAnimeInfo';
import {
  createCharacterInfoFromGetAnime,
  createCharacterInfoFromGetCharacters,
} from '@/utils/createCharacterInfo';
import { castArray, remove } from 'lodash-es';
import { computed, reactive, ref } from 'vue';
import BaseField from '../@base/field/BaseField.vue';
import BaseLoader from '../@base/loader/BaseLoader.vue';
import BaseSelectBox from '../@base/select-box/BaseSelectBox.vue';
import BaseTextBox from '../@base/text-box/BaseTextBox.vue';
import ExternalLinkIcon from '../@icons/ExternalLinkIcon.vue';
import KeyButton from './KeyButton.vue';
import SearchResult from './SearchResult.vue';

const props = withDefaults(
  defineProps<{
    /** Gender, has effect only when `type` is `'character'`. */
    gender?: MaybeArray<'Female' | 'Male' | 'Other'>;
    /** Search type. */
    type?: 'character' | 'anime';
    /** Array of ids. */
    value?: number[];
  }>(),
  {
    gender: 'Female',
    type: 'character',
    value: () => [],
  },
);

defineEmits<{
  (e: 'change', value: number[]): void;
}>();

const modelValue = ref(props.value);
const searchQuery = ref<string>();

const year = ref<number>();
const yearOptions: InstanceType<typeof BaseSelectBox>['options'] = Array.from({
  length: new Date().getFullYear() - 1940 + 1,
})
  .map((_, index) => 1940 + index)
  .reverse()
  .map((year) => ({
    caption: year.toString(),
    value: year,
  }));

const season = ref<MediaSeason>();
const seasonOptions: InstanceType<typeof BaseSelectBox>['options'] =
  Object.entries(MediaSeason).map(
    ([caption, value]: [string, MediaSeason]) => ({
      caption,
      value,
    }),
  );

const getCharactersQuery = reactive(
  useGetCharactersQuery(
    () => ({ search: searchQuery.value }),
    () => ({ enabled: props.type === 'character' }),
  ),
);

const getAnimeQuery = reactive(
  useGetAnimeQuery(() => ({
    search: searchQuery.value,
    season: season.value,
    seasonYear: year.value,
  })),
);

const isLoading = computed(() => {
  return getCharactersQuery.loading || getAnimeQuery.loading;
});

const characterResults = computed(() => {
  if (props.type === 'anime') return [];
  const fromCharacters = createCharacterInfoFromGetCharacters(
    getCharactersQuery.result,
  );
  const fromAnime = createCharacterInfoFromGetAnime(
    getAnimeQuery.result,
  ).filter(({ id }) => {
    return !fromCharacters.map(({ id }) => id).includes(id);
  });
  return [...fromCharacters, ...fromAnime];
});

const animeResults = computed(() => {
  if (props.type === 'character') return [];
  return createAnimeInfoFromGetAnime(getAnimeQuery.result);
});

const searchResults = computed<
  Array<{
    /** Unique key. */
    key: symbol;
    /** Component props. */
    props: InstanceType<typeof SearchResult>['$props'];
    /** On check/uncheck. */
    onClick: EventListener;
  }>
>(() => {
  switch (props.type) {
    case 'anime':
      return animeResults.value
        .filter(({ imageUrl }) => !imageUrl.endsWith('/default.jpg'))
        .map((anime) => {
          const isChecked = modelValue.value.includes(anime.id);
          return {
            key: Symbol(anime.name),
            props: {
              image: anime.imageUrl,
              name: anime.name,
              metadata: anime,
              checked: isChecked,
            },
            onClick: () => {
              isChecked
                ? remove(modelValue.value, (id) => id === anime.id)
                : modelValue.value.push(anime.id);
            },
          };
        });
    default:
      return characterResults.value
        .filter(
          ({ gender, imageUrl }) =>
            castArray(props.gender).some((value) => value === gender) &&
            !imageUrl.endsWith('/default.jpg'),
        )
        .map((character) => {
          const isChecked = modelValue.value.includes(character.id);
          return {
            key: Symbol(character.fullName),
            props: {
              image: character.imageUrl,
              name: character.fullName,
              metadata: character,
              checked: isChecked,
            },
            onClick: () => {
              isChecked
                ? remove(modelValue.value, (id) => id === character.id)
                : modelValue.value.push(character.id);
            },
          };
        });
  }
});
</script>

<template>
  <div>
    <div :class="$style.header">
      <div>
        <h1 :class="$style.title">Search</h1>
        <p :class="$style.desc">
          Quis nostrud Lorem irure nostrud est quis deserunt. Sunt dolore sint
          eiusmod incididunt enim qui ex ad adipisicing.
        </p>
        <p :class="$style.poweredBy">
          Search powered by
          <a href="https://anilist.co/" target="_blank" rel="noreferrer">
            anilist.co
            <ExternalLinkIcon :size="12" />
          </a>
        </p>
      </div>
      <div>
        <KeyButton event-key="Escape" @event="$emit('change', modelValue)">
          Close
        </KeyButton>
      </div>
    </div>
    <div :class="$style.inputs">
      <BaseField label="Search" :class="$style.inputs_search">
        <BaseTextBox v-model="searchQuery" search />
      </BaseField>
      <BaseField label="Year" :class="$style.inputs_year">
        <BaseSelectBox v-model="year" :options="yearOptions" />
      </BaseField>
      <BaseField label="Season" :class="$style.inputs_season">
        <BaseSelectBox v-model="season" :options="seasonOptions" />
      </BaseField>
    </div>
    <div :class="$style.total">
      <div :class="$style.total_count">{{ modelValue.length }}</div>
      <div :class="$style.total_desc">Selected</div>
      <div :class="$style.total_hint">Confirm by closing</div>
    </div>
    <BaseLoader v-if="isLoading" />
    <div v-else :class="$style.grid">
      <SearchResult
        v-for="item in searchResults"
        :key="item.key"
        v-bind="item.props"
        @click="item.onClick" />
    </div>
  </div>
</template>

<style module lang="scss">
.header {
  align-items: flex-start;
  column-gap: 36px;
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 36px;
  }
}

.title {
  color: var(--text);
  font-size: 1.875rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 6px;
}

.desc {
  margin: 0;
  max-width: 660px;
}

.poweredBy {
  color: var(--text-light);
  font-size: 14px;
  margin: 0;
  :where(a) {
    color: var(--primary);
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}

.total {
  text-align: right;
  &_count {
    color: var(--text);
    font-size: 20px;
    font-weight: bold;
  }
  &_desc {
    color: var(--text);
  }
  &_hint {
    color: var(--text-light);
    font-size: 14px;
  }
}

.inputs {
  display: flex;
  gap: 24px;
  max-width: 760px;
  &:not(:last-child) {
    margin-bottom: 36px;
  }
  &_search {
    flex: 4;
  }
  &_year {
    flex: 2;
  }
  &_season {
    flex: 3;
  }
}

.grid {
  align-items: flex-start;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}
</style>
