<script setup lang="ts">
import { ref } from 'vue';
import SearchBox from './components/SearchBox.vue';

const searchQuery = ref('');
</script>

<template>
  <div>
    <h1>Waifu Wars</h1>
    <p>
      We all have our favorite waifus. And of course we can scientifically prove
      it by comparing them to inferior trash.
    </p>
    <SearchBox v-model="searchQuery" />
    <div>Search powered by Anilist public api.</div>
  </div>
</template>
