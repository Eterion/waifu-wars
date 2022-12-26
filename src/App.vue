<script setup lang="ts">
import { reactive, ref } from 'vue';
import BaseChip from './components/BaseChip.vue';
import GridIcon from './components/icons/GridIcon.vue';
import ListIcon from './components/icons/ListIcon.vue';
import SearchBox from './components/SearchBox.vue';

const searchQuery = ref('');
const isGrid = ref(false);
const isFilter = reactive({
  waifus: true,
  husbandos: false,
  other: false,
});
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
        <li>
          <BaseChip v-model:active="isFilter.waifus">Waifus</BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="isFilter.husbandos">Husbandos</BaseChip>
        </li>
        <li>
          <BaseChip v-model:active="isFilter.other">Other</BaseChip>
        </li>
      </ul>
    </div>
  </div>
</template>
