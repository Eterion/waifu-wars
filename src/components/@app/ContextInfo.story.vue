<script setup lang="ts">
import type { AnimeInfo } from '@/types/AnimeInfo';
import type { CharacterInfo } from '@/types/CharacterInfo';
import { ref } from 'vue';
import ContextInfo from './ContextInfo.vue';

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

const buttonRef = ref<HTMLElement>();
</script>

<template>
  <Story>
    <Variant title="Character">
      <button ref="buttonRef" type="button">Context Info</button>
      <ContextInfo
        :info="characterInfo"
        :outside-reference-element="buttonRef" />
    </Variant>
    <Variant title="Anime">
      <button ref="buttonRef" type="button">Context Info</button>
      <ContextInfo :info="animeInfo" :outside-reference-element="buttonRef" />
    </Variant>
  </Story>
</template>
