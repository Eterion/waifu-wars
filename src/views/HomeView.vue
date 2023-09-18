<script setup lang="ts">
import PresetCard from '@/components/@app/PresetCard.vue';
import { useAnimeSeason } from '@/composables/useAnimeSeason';
import {
  useGetAnimeQuery,
  useGetCharactersQuery,
} from '@/composables/useGraphQL';
import { createAnimeInfoFromGetAnime } from '@/utils/createAnimeInfo';
import {
  createCharacterInfoFromGetAnime,
  createCharacterInfoFromGetCharacters,
} from '@/utils/createCharacterInfo';
import { reactiveComputed } from '@vueuse/core';
import { startCase } from 'lodash-es';
import { computed } from 'vue';

const { result: __getCharactersResult } = useGetCharactersQuery();
const __mostPopularWaifus = computed(() => {
  return createCharacterInfoFromGetCharacters(__getCharactersResult.value)
    .filter(({ gender }) => gender === 'Female')
    .slice(0, 3);
});

const customWaifu = computed(() => __mostPopularWaifus.value.at(0));
const allTime50Waifu = computed(() => __mostPopularWaifus.value.at(1));
const allTime100Waifu = computed(() => __mostPopularWaifus.value.at(2));

const { currentSeason, lastSeason } = useAnimeSeason();
const { result: __getCurrentSeasonAnimeResult } = useGetAnimeQuery(() => ({
  season: currentSeason.kind,
  seasonYear: currentSeason.year,
}));

const airingSeasonWaifu = reactiveComputed(() => {
  const ids = __mostPopularWaifus.value.map(({ id }) => id);
  return {
    info: createCharacterInfoFromGetAnime(__getCurrentSeasonAnimeResult.value)
      .filter(({ gender, id }) => gender === 'Female' && !ids.includes(id))
      .at(0),
    get excludedIds() {
      return [...ids, this.info?.id];
    },
  };
});

const { result: __getLastSeasonAnimeResult } = useGetAnimeQuery(() => ({
  season: lastSeason.kind,
  seasonYear: lastSeason.year,
}));

const lastSeasonWaifu = reactiveComputed(() => {
  const ids = airingSeasonWaifu.excludedIds;
  return {
    info: createCharacterInfoFromGetAnime(__getLastSeasonAnimeResult.value)
      .filter(({ gender, id }) => gender === 'Female' && !ids.includes(id))
      .at(0),
    get excludedIds() {
      return [...ids, this.info?.id];
    },
  };
});

const { result: __getCurrentYearAnimeResult } = useGetAnimeQuery(() => ({
  seasonYear: currentSeason.year,
}));

const currentYearWaifu = reactiveComputed(() => {
  const ids = lastSeasonWaifu.excludedIds;
  return {
    info: createCharacterInfoFromGetAnime(__getCurrentYearAnimeResult.value)
      .filter(({ gender, id }) => gender === 'Female' && !ids.includes(id))
      .at(0),
    get excludedIds() {
      return [...ids, this.info?.id];
    },
  };
});

const { result: __getLastYearAnimeResult } = useGetAnimeQuery(() => ({
  seasonYear: currentSeason.year - 1,
}));

const lastYearWaifu = reactiveComputed(() => {
  const ids = currentYearWaifu.excludedIds;
  return {
    info: createCharacterInfoFromGetAnime(__getLastYearAnimeResult.value)
      .filter(({ gender, id }) => gender === 'Female' && !ids.includes(id))
      .at(0),
  };
});

const { result: __getAnimeResult } = useGetAnimeQuery();
const customAnime = computed(() => {
  return createAnimeInfoFromGetAnime(__getAnimeResult.value).at(0);
});

const airingSeasonAnime = reactiveComputed(() => {
  const ids = [customAnime.value?.id];
  return {
    info: createAnimeInfoFromGetAnime(__getCurrentSeasonAnimeResult.value)
      .filter(({ id }) => !ids.includes(id))
      .at(0),
    get excludedIds() {
      return [...ids, this.info?.id];
    },
  };
});

const lastSeasonAnime = reactiveComputed(() => {
  const ids = airingSeasonAnime.excludedIds;
  return {
    info: createAnimeInfoFromGetAnime(__getLastSeasonAnimeResult.value)
      .filter(({ id }) => !ids.includes(id))
      .at(0),
    get excludedIds() {
      return [...ids, this.info?.id];
    },
  };
});

const lastYearAnime = reactiveComputed(() => {
  const ids = lastSeasonAnime.excludedIds;
  return {
    info: createAnimeInfoFromGetAnime(__getLastYearAnimeResult.value)
      .filter(({ id }) => !ids.includes(id))
      .at(0),
  };
});

const dataSource = computed<
  Array<{
    title: string;
    desc: string;
    presets: Array<InstanceType<typeof PresetCard>['$props']>;
  }>
>(() => [
  {
    title: 'Waifus',
    desc: 'Ultimately ranks mean nothing and we all know our particular waifu is the best. That aside, it doesn’t stop us from comparing our angels to inferior trash.',
    presets: [
      {
        title: 'Custom',
        desc: 'Start with a blank list and create a rankings of whatever waifus you desire.',
        thumbnail: customWaifu.value?.imageUrl,
        metadata: customWaifu.value,
        to: '/w',
      },
      {
        title: `Airing Season (${startCase(currentSeason.kind.toLowerCase())} ${
          currentSeason.year
        })`,
        desc: 'Populates the list with waifus from the current airing season.',
        thumbnail: airingSeasonWaifu.info?.imageUrl,
        metadata: airingSeasonWaifu.info,
        to: `/w/${currentSeason.kind.toLowerCase()}/${currentSeason.year}`,
      },
      {
        title: `Last Season (${startCase(lastSeason.kind?.toLowerCase())} ${
          lastSeason.year
        })`,
        desc: 'Populates the list with waifus from the last season.',
        thumbnail: lastSeasonWaifu.info?.imageUrl,
        metadata: lastSeasonWaifu.info,
        to: `/w/${lastSeason.kind?.toLowerCase()}/${lastSeason.year}`,
      },
      {
        title: `Current Year (${currentSeason.year})`,
        desc: 'Populates the list with waifus from the current year.',
        thumbnail: currentYearWaifu.info?.imageUrl,
        metadata: currentYearWaifu.info,
        to: `/w/${currentSeason.year}`,
      },
      {
        title: `Last Year (${currentSeason.year - 1})`,
        desc: 'Populates the list with waifus from the last year.',
        thumbnail: lastYearWaifu.info?.imageUrl,
        metadata: lastYearWaifu.info,
        to: `/w/${lastSeason.year}`,
      },
      {
        title: 'All-time 50',
        desc: 'Populates the list with 50 most popular waifus of all time.',
        thumbnail: allTime50Waifu.value?.imageUrl,
        metadata: allTime50Waifu.value,
        to: '/w/top/50',
      },
      {
        title: 'All-time 100',
        desc: 'Populates the list with 100 most popular waifus of all time.',
        thumbnail: allTime100Waifu.value?.imageUrl,
        metadata: allTime100Waifu.value,
        to: '/w/top/100',
      },
    ],
  },
  {
    title: 'Anime',
    desc: 'Even if your favorite anime is not held in high regard or generally popular, it doesn’t mean it’s bad. We all heave our guilty pleasures.',
    presets: [
      {
        title: 'Custom',
        desc: 'Start with a blank list and create a rankings of whatever animes you desire.',
        thumbnail: customAnime.value?.imageUrl,
        metadata: customAnime.value,
        to: '/a',
      },
      {
        title: 'Airing Season (Winter 2023)',
        desc: 'Populate the list with animes from the current airing season.',
        thumbnail: airingSeasonAnime.info?.imageUrl,
        metadata: airingSeasonAnime.info,
        to: `/a/${currentSeason.kind.toLowerCase()}/${currentSeason.year}`,
      },
      {
        title: 'Last Season (Fall 2022)',
        desc: 'Populate the list with animes from the last season.',
        thumbnail: lastSeasonAnime.info?.imageUrl,
        metadata: lastSeasonAnime.info,
        to: `/a/${lastSeason.kind?.toLowerCase()}/${lastSeason.year}`,
      },
      {
        title: 'Last Year (2022)',
        desc: 'The true anime of the year.',
        thumbnail: lastYearAnime.info?.imageUrl,
        metadata: lastYearAnime.info,
        to: `/a/${currentSeason.year - 1}`,
      },
    ],
  },
]);
</script>

<template>
  <div>
    <template v-for="section in dataSource" :key="section.title">
      <div v-if="section.presets.length" :class="$style.section">
        <h2 :class="$style.title">{{ section.title }}</h2>
        <p :class="$style.desc">{{ section.desc }}</p>
        <div :class="$style.grid">
          <PresetCard
            v-for="preset in section.presets"
            :key="preset.title"
            v-bind="preset" />
        </div>
      </div>
    </template>
  </div>
</template>

<style module lang="scss">
.section {
  &:not(:last-child) {
    margin-bottom: 48px;
  }
}

.title {
  font-size: 30px;
  font-weight: semibold;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}

.desc {
  max-width: 660px;
  &:not(:last-child) {
    margin-bottom: 36px;
  }
}

.grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
</style>
