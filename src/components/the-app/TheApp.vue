<script setup lang="ts">
import DraggingCharacter from '../DraggingCharacter.vue';
import RemoveCharacterDropZone from '../RemoveCharacterDropZone.vue';
import TheAppCharacters from './TheAppCharacters.vue';
import TheAppHeader from './TheAppHeader.vue';
import TheAppSearch from './TheAppSearch.vue';
import TheAppSocial from './TheAppSocial.vue';
import TheAppTiers from './TheAppTiers.vue';
</script>

<template>
  <div :class="$style.el">
    <RemoveCharacterDropZone />
    <DraggingCharacter />
    <aside :class="$style.sidebar">
      <TheAppHeader />
      <TheAppSearch />
    </aside>
    <main :class="$style.main">
      <TheAppSocial />
      <TheAppCharacters />
      <TheAppTiers />
    </main>
  </div>
</template>

<style module lang="scss">
.el {
  display: grid;
  grid-template-columns: 480px 1fr;
  height: 100%;
}

.sidebar,
.main {
  padding: 64px;
}
</style>
