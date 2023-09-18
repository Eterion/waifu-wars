<script setup lang="ts">
import type { AnimeInfo } from '@/types/AnimeInfo';
import type { CharacterInfo } from '@/types/CharacterInfo';
import PresetCard from './PresetCard.vue';

const characterInfo: CharacterInfo = {
  animeMalId: 51105,
  animeName: 'NieR:Automata Ver1.1a',
  animeUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
  fullName: 'YoRHa 2-gou B-gata',
  id: 132494,
  imageUrl:
    'https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg',
  siteUrl: 'https://anilist.co/character/132494/YoRHa-2gou-Bgata',
};

const animeInfo: AnimeInfo = {
  id: 145665,
  imageUrl:
    'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145665-kiAZX3DsbBnl.jpg',
  malId: 51105,
  name: 'NieR:Automata Ver1.1a',
  siteUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
};
</script>

<template>
  <Story>
    <Variant title="Character">
      <PresetCard
        title="Airing Season"
        desc="Start with waifus from the current airing season and continue from there."
        to="/"
        :thumbnail="characterInfo.imageUrl"
        :metadata="characterInfo"
        style="width: 265px" />
    </Variant>
    <Variant title="Anime">
      <PresetCard
        title="Airing Season"
        desc="Start with animes from the current airing season and continue from there."
        to="/"
        :thumbnail="animeInfo.imageUrl"
        :metadata="animeInfo"
        style="width: 265px" />
    </Variant>
  </Story>
</template>
