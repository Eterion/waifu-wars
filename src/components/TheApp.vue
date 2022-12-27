<script setup lang="ts">
import TheAppButtons from './TheAppButtons.vue';
import TheAppFavorites from './TheAppFavorites.vue';
import TheAppHeader from './TheAppHeader.vue';
import TheAppSearch from './TheAppSearch.vue';
import TheAppTiers from './TheAppTiers.vue';
</script>

<template>
  <div :class="$style.el">
    <aside :class="$style.sidebar">
      <TheAppHeader />
      <TheAppSearch />
    </aside>
    <main :class="$style.main">
      <TheAppButtons />
      <TheAppFavorites />
      <TheAppTiers />
    </main>
  </div>
</template>

<style module lang="scss">
.el {
  display: grid;
  grid-template-columns: 480px 1fr;
}

.sidebar,
.main {
  padding: 64px;
}
</style>
