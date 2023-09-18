<script setup lang="ts">
import type { CharacterInfo } from '@/types/CharacterInfo';
import { ref } from 'vue';
import DropZone from './DropZone.vue';

const nier2b: CharacterInfo = {
  animeMalId: 51105,
  animeName: 'NieR:Automata Ver1.1a',
  animeUrl: 'https://anilist.co/anime/145665/NieRAutomata-Ver11a/',
  fullName: 'YoRHa 2-gou B-gata',
  id: 132494,
  imageUrl:
    'https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg',
  siteUrl: 'https://anilist.co/character/132494/YoRHa-2gou-Bgata',
};

const aqua: CharacterInfo = {
  animeMalId: 117223,
  animeName: 'Kono Subarashii Sekai ni Shukufuku wo!',
  animeUrl:
    'https://anilist.co/anime/21202/Kono-Subarashii-Sekai-ni-Shukufuku-wo/',
  fullName: 'Aqua',
  id: 89362,
  imageUrl:
    'https://s4.anilist.co/file/anilistcdn/character/large/b89362-ibkc0eoECaW1.png',
  siteUrl: 'https://anilist.co/character/89362/Aqua',
};

const zero2: CharacterInfo = {
  animeMalId: 35849,
  animeName: 'Darling in the Franxx',
  animeUrl: 'https://anilist.co/anime/99423/Darling-in-the-Franxx/',
  fullName: 'Zero Two',
  id: 124381,
  imageUrl:
    'https://s4.anilist.co/file/anilistcdn/character/large/b124381-pkTKi6HHNuVR.png',
  siteUrl: 'https://anilist.co/character/124381/Zero-Two',
};

type ModelValue = InstanceType<typeof DropZone>['modelValue'];
const dropZone1 = ref<ModelValue>([
  {
    image: nier2b.imageUrl,
    name: nier2b.fullName,
    metadata: nier2b,
  },
  {
    image: aqua.imageUrl,
    name: aqua.fullName,
    metadata: aqua,
  },
  {
    image: zero2.imageUrl,
    name: zero2.fullName,
    metadata: zero2,
  },
]);
const dropZone2 = ref<ModelValue>([]);
</script>

<template>
  <Story>
    <DropZone :model-value="dropZone1" :class="$style.dropZone" />
    <DropZone :model-value="dropZone2" :class="$style.dropZone" />
  </Story>
</template>

<style module lang="scss">
.dropZone {
  background-color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 12px;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
}
</style>
