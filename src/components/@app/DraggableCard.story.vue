<script setup lang="ts">
import type { AnimeInfo } from '@/types/AnimeInfo';
import type { CharacterInfo } from '@/types/CharacterInfo';
import DraggableCard from './DraggableCard.vue';

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
      <DraggableCard
        :image="characterInfo.imageUrl"
        :name="characterInfo.fullName"
        :metadata="characterInfo" />
    </Variant>
    <Variant title="Anime">
      <DraggableCard
        :image="animeInfo.imageUrl"
        :name="animeInfo.name"
        :metadata="animeInfo" />
    </Variant>
    <Variant title="Faded">
      <DraggableCard
        :image="characterInfo.imageUrl"
        :name="characterInfo.fullName"
        :metadata="characterInfo"
        faded />
    </Variant>
  </Story>
</template>
