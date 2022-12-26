<script setup lang="ts">
import { ref } from 'vue';
import GridIcon from './components/icons/GridIcon.vue';
import ListIcon from './components/icons/ListIcon.vue';
import SearchBox from './components/SearchBox.vue';

const searchQuery = ref('');
const isGrid = ref(false);
</script>

<template>
  <div>
    <div>
      <h1>Waifu Wars</h1>
      <p>
        We all have our favorite waifus. And of course we can scientifically
        prove it by comparing them to inferior trash.
      </p>
    </div>
    <div>
      <SearchBox v-model="searchQuery" />
      <div>Search powered by Anilist public api.</div>
    </div>
    <div>
      <ul>
        <li>
          <button type="button" @click="isGrid = !isGrid">
            <ListIcon v-if="isGrid" />
            <GridIcon v-else />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
