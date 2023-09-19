<script setup lang="ts">
import { apolloClient } from '@/apolloClient';
import ButtonGroup from '@/components/@app/ButtonGroup.vue';
import DraggableCard from '@/components/@app/DraggableCard.vue';
import SearchPage from '@/components/@app/SearchPage.vue';
import BaseButton from '@/components/@base/button/BaseButton.vue';
import {
  useGetAnimeQuery,
  useGetCharactersQuery,
} from '@/composables/useGraphQL';
import {
  createCharacterInfoFromGetAnime,
  createCharacterInfoFromGetCharacters,
} from '@/utils/createCharacterInfo';
import { parseMediaSeason } from '@/utils/parseMediaSeason';
import { resolveRouteParams } from '@/utils/resolveRouteParams';
import { provideApolloClient } from '@vue/apollo-composable';
import { useEventListener } from '@vueuse/core';
import { castArray } from 'lodash-es';
import { computed, ref } from 'vue';
import { useRoute, type NavigationGuard } from 'vue-router';

defineOptions({
  async beforeRouteEnter({ params, query }) {
    if (query.collection) return true;
    const { season, year } = resolveRouteParams(params, {
      season: String,
      year: Number,
    });
    provideApolloClient(apolloClient);
    const { onResult } = useGetAnimeQuery({
      season: parseMediaSeason(season),
      seasonYear: year,
    });
    return new Promise<Awaited<ReturnType<NavigationGuard>>>((resolve) => {
      onResult((result) => {
        resolve({
          path: '/w',
          query: {
            ...query,
            collection: createCharacterInfoFromGetAnime(result.data)
              .filter(
                ({ gender, imageUrl }) =>
                  gender === 'Female' && !/\/default\.jpg$/.test(imageUrl),
              )
              .sort((a, b) => (b.favourites ?? 0) - (a.favourites ?? 0))
              .map(({ id }) => id)
              .join(','),
          },
        });
      });
    });
  },
});

const route = useRoute();
const title = computed(() => castArray(route.query.title).at(0));
const desc = computed(() => castArray(route.query.desc).at(0));
const collection = ref<number[]>([]);

const { loading, result } = useGetCharactersQuery(() => ({
  pick: collection.value,
}));

const charactersInfo = computed(() => {
  return createCharacterInfoFromGetCharacters(result.value)
    .filter(({ gender, imageUrl }) => {
      return gender === 'Female' && !/\/default\.jpg$/.test(imageUrl);
    })
    .sort((a, b) => {
      return (b.favourites ?? 0) - (a.favourites ?? 0);
    })
    .map<{
      /** Id. */
      id: number;
      /** Draggable card props. */
      cardProps: InstanceType<typeof DraggableCard>['$props'];
    }>((character) => ({
      id: character.id,
      cardProps: {
        image: character.imageUrl,
        name: character.fullName,
        metadata: character,
      },
    }));
});

const gridRef = ref<HTMLElement>();
useEventListener(
  gridRef,
  'wheel',
  (event) => {
    event.preventDefault();
    if (gridRef.value)
      gridRef.value.scrollTo({
        left: gridRef.value.scrollLeft + event.deltaY,
      });
  },
  { passive: false },
);
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ desc }}</p>
    <ButtonGroup>
      <BaseButton>Add Waifus</BaseButton>
      <BaseButton primary>Share</BaseButton>
    </ButtonGroup>
    <div v-if="loading">Loading</div>
    <div v-else ref="gridRef" :class="$style.grid">
      <DraggableCard
        v-for="item in charactersInfo"
        :key="item.id"
        :class="$style.card"
        v-bind="item.cardProps" />
    </div>
    <SearchPage :value="collection" />
  </div>
</template>

<style module lang="scss">
@use '@/css/scrollbar';

.grid {
  @include scrollbar.none;
  display: flex;
  gap: 6px;
  margin-right: calc((100dvw - var(--app-max-width)) / 2 * -1 - 36px);
  overflow-x: auto;
}

.card {
  flex-shrink: 0;
}
</style>
